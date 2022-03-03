const Table = require("./table.js");
const Util = require("./util.js")
const CueBall = require("./cue_ball.js");

class Game {
  constructor (canvas, ctx) {
    this.table = new Table(canvas, ctx);
    this.pockets = this.table.pockets;
    this.walls = this.table.walls;
    this.balls = this.table.balls;
    this.cue = this.table.balls[0];
    this.ctx = ctx;
  }

  update(timeDelta) {
    this.moveBalls(timeDelta);
    this.detectCollisions();
    this.detectWallCollisions();
    this.detectPocketed();
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
          if (ball instanceof CueBall) {
            setTimeout( () => { ball.handleScratch()}, 2000)           
          }
        }
      }
    }
  }
}

module.exports = Game;