const Player = require("./player.js");
const Table = require("./table.js");
const Util = require("./util.js")
const CueBall = require("./cue_ball.js");
const Stick = require("./stick.js")

class Game {
  constructor (canvas, ctx) {
    this.canvas = canvas;
    this.table = new Table(canvas, ctx);
    this.pockets = this.table.pockets;
    this.walls = this.table.walls;
    this.balls = this.table.balls;
    this.cue = this.table.balls[0];
    this.ctx = ctx;

    this.players = [new Player(1), new Player(2)];
    this.waitForHit = true;
    this.openBreak = true;    
    this.currentPlayer = this.players[0];    
    this.otherPlayer = this.players[1];
    this.pocketed = null;
    this.firstBallHit = null;
    this.scratched = false;
    this.over = false;

    this.stick = new Stick(this.canvas);

    this.play();
    this.updateTracker();

    // setInterval(() => {
    //   console.log('cue pos: ' + this.cue.pos)
    //   console.log('cue vel: ' + this.cue.vel)
    // }, 500);
  }

  play() {  
    const clickToHit = (e) => {  
      if (this.cue.canBeHit && this.waitForHit) {
        this.stick.rotating = false;
        this.cue.calcHit(e, () => {        
          this.waitForHit = false;        
          this.stick.visible = false;
        });
      }
    }      
    this.canvas.addEventListener("click", clickToHit);    
  }

  reset() {
    this.waitForHit = true;
    this.openBreak = true;    
    this.currentPlayer = this.players[0];    
    this.otherPlayer = this.players[1];
    this.pocketed = null;
    this.firstBallHit = null;
    this.scratched = false;
    this.over = false;

    this.players.forEach( player => {
      player.ballType = null;
      player.lastBall = false;
    })

    this.updateTracker();
  }

  update(timeDelta) {    
    this.moveBalls(timeDelta);
    this.detectCollisions();
    this.detectWallCollisions();
    this.detectPocketed();
    
    if (!this.waitForHit) {
      this.checkStopped();
    }
  }

  checkStopped() {
    if (this.balls.every( ball => ball.isStationary())) {
      this.waitForHit = true;
      this.endOfTurn();
    }
  }

  endOfTurn() {
    let checkBalls = this.table.pocketed.filter(ball => ball.type === this.currentPlayer.ballType)
    if (checkBalls.length === 7) {
      this.currentPlayer.lastBall = true
    };

    if (!this.balls[8].onTable && !this.over) {
      this.gameOver();
      this.over = true;
    }

    this.checkScratch();
    if (this.scratched) {
      this.cue.handleScratch();     
      this.resolveTurn(true);
    } else if (this.pocketed !== null) {   
        let type = this.pocketed.type;        
        if (this.openBreak && type !== 'white') {
          this.assignType(type);
          this.openBreak = false;           
          this.resolveTurn(false);    
        } else if (type !== this.currentPlayer.ballType) {          
          this.resolveTurn(true);
        } else {
          this.resolveTurn(false);
        }
    } else {
      this.resolveTurn(true);
    }   
  }

  resolveTurn(switchPlayer) {
    this.pocketed = null; 
    this.waitForHit = true; 
    this.firstBallHit = null;
    this.scratched = false
    if (switchPlayer) {this.switchTurn()};
    this.updateTracker();

    this.stick.visible = true;
    this.stick.rotating = true;
  }

  switchTurn() {
    this.players.reverse();
    this.currentPlayer = this.players[0];    
    this.otherPlayer = this.players[1];
  }

  updateTracker() {
    if (!this.over) {
      const player = this.currentPlayer.num;
      const turn = this.currentPlayer.ballType;
      const p = document.querySelector(".tracker");

      if (turn === null) {
        p.innerHTML = `It is Player ${player}'s turn! Open table!`
      } else if (this.currentPlayer.lastBall) {
        p.innerHTML = `It is Player ${player}'s turn! Sink the 8 to win!`
      } else {
        p.innerHTML = `It is Player ${player}'s turn! You are ${turn}.`
      }
    }
  }

  assignType(type) {
    if (type === 'solid') {
      this.currentPlayer.ballType = 'solid';
      this.otherPlayer.ballType = 'stripe';
    } else if (type === 'stripe') {
      this.currentPlayer.ballType = 'stripe';
      this.otherPlayer.ballType = 'solid';
    }
  }

  moveBalls(timeDelta) {
    this.balls.forEach( ball1 => {
      ball1.move(timeDelta);        
    })
  }
  
  

  detectCollisions() {       
    let obj1;
    let obj2;    
    let colDist = this.cue.radius * 2.1;    
    
    for (let i = 0; i < 16; i++) {
      obj1 = this.balls[i];        
      if (!obj1.onTable) {continue};
      for (let j = i + 1; j < 16; j++)
      {
        obj2 = this.balls[j];    
        if (!obj2.onTable) {continue};
        if (Util.getDistance(obj1, obj2) <= colDist) {              
          Util.ballCollisionMath(obj1, obj2);

          if (obj1 instanceof CueBall && !this.firstBallHit && !obj1.ballInHand) {
            this.firstBallHit = obj2;          
          }

        } 
        
      }
    }   
  }  

  detectWallCollisions() {
    for (let i = 0; i < 16; i++) {
      let ball = this.balls[i];      
      if (!ball.onTable && ball.isStationary) {continue}

      let bx = ball.pos[0];
      let by = ball.pos[1];

      for (let j = 0; j < 18; j++) {
        let wall = this.walls[j];
        let wx1 = wall.x1;
        let wx2 = wall.x2;
        let wy1 = wall.y1;
        let wy2 = wall.y2;

        //find closest point on wall
        let wallLen = Util.getPointDistance(wx1, wy1, wx2, wy2);
        let dot = ( ((bx - wx1) * (wx2 - wx1)) + ((by - wy1) * (wy2 - wy1)) ) / Math.pow(wallLen, 2);
        let closestX = wx1 + (dot * (wx2 - wx1));        
        let closestY = wy1 + (dot * (wy2 - wy1));        

        //make sure closest point is on the line
        if (!wall.isPointCollide(closestX, closestY)) {
          continue;
        }

        let distance = Util.getPointDistance(bx, by, closestX, closestY);

        if (distance <= ball.radius) {    
          ball.collideEdge(wall);
        }                
      }
    }
  }

  detectPocketed() {
    for (let i = 0; i < 16; i++) {
      let ball = this.balls[i];      
      if (!ball.onTable && ball.isStationary) {continue}
      if (ball instanceof CueBall && ball.ballInHand) {continue}

      for (let j = 0; j < 6; j++) {
        let pocket = this.pockets[j];
        let r = pocket.radius;

        let dist = Util.getPointDistance(ball.pos[0], ball.pos[1], pocket.x, pocket.y);    

        if (dist <= r) {          
          ball.sink();
          if (ball.type === 'solid' || ball.type === 'stripe') {
            this.table.pocketed.push(ball);
          }
          if (!this.pocketed && ball.type !== 'white') {            
            this.pocketed = ball;            
          }
          if (ball instanceof CueBall && !ball.ballInHand) {
            this.scratched = true;  
          }
        }
      }
    }
  }  

  checkScratch() {
    if (this.firstBallHit === null) {
      this.scratched = true;
    } else if (this.firstBallHit.type === 'eight') {
      if (!this.currentPlayer.lastBall) {
        this.scratched = true;
      }
    } else {
      if (this.currentPlayer.ballType !== this.firstBallHit.type && !this.openBreak) {  
        this.scratched = true;      
      }  
    }
  }

  gameOver() {
    let type = this.currentPlayer.ballType;
    let checkBalls = this.table.pocketed.filter( ball => ball.type === type );
    const p = document.querySelector(".tracker");
    if (checkBalls.length === 7 && !this.scratched) {
      p.innerHTML = `Player ${this.currentPlayer.num} wins!`
    } else {
      p.innerHTML = `Player ${this.currentPlayer.num} loses!`
    }   
  }
}

module.exports = Game;