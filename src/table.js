const Pocket = require("./pocket.js");
const Wall = require("./wall.js");
const Ball = require ("./ball.js");
const CueBall = require("./cue_ball.js");
const Util = require("./util.js");

class Table {
  constructor (canvas, ctx) {
    this.ctx = ctx;

    this.balls = this.generateBalls();
    this.positionBalls();

    this.walls = this.generateWalls();
    
    this.pockets = this.generatePockets();

    this.width = canvas.width;
    this.height = this.width / 2;

    this.img = new Image();
    this.img.src = "../src/assets/images/table.png"
  }

  generateBalls () {
    const balls = [];
    for(let i = 0; i <= 15; i++) {
      let ball;
      if (i === 0) {
        ball = new CueBall(i);
        balls.push(ball);
      } else {
        ball = new Ball(i);
        balls.push(ball);
      }
    }    
    return balls;
  }

  draw(ctx) {     
    ctx.drawImage(this.img, 0, 0, this.width, this.height);   
    this.balls.forEach( (ball) => { ball.draw(this.ctx) } );     
    // this.pockets.forEach( (pocket) => { pocket.draw(this.ctx) } ); 
  }

  resetTable() {
    for (const ball of this.balls) {
      ball.resetBall();
    }
    this.positionBalls();
  }

  positionBalls () {     

    let x = 375;
    let y = 325;
    this.balls[0].pos = [1050, y];

    let r = this.balls[0].radius;
    let d = (r * 2) ;
    
    this.balls[1].pos = [x, y];

    this.balls[2].pos = [x - d, y - r];
    this.balls[3].pos = [x - d, y + r];

    this.balls[4].pos = [x - (d * 2), y - d];
    this.balls[8].pos = [x - (d * 2), y];
    this.balls[5].pos = [x - (d * 2), y + d];

    this.balls[6].pos = [x - (d * 3), y + r];
    this.balls[7].pos = [x - (d * 3), y + (d + r)];   
    this.balls[9].pos = [x - (d * 3), y - (d + r)];
    this.balls[10].pos = [x - (d * 3), y - r];

    this.balls[11].pos = [x - (d * 4), y - d];
    this.balls[12].pos = [x - (d * 4), y];
    this.balls[13].pos = [x - (d * 4), y + d];
    this.balls[14].pos = [x - (d * 4), y + (d * 2)];
    this.balls[15].pos = [x - (d * 4), y - (d * 2)];
  }

  generateWalls() {
    return [
      new Wall(127, 80, 650, 80, 'horizontal', 'top'), //top-left
      new Wall(735, 80, 1262, 80, 'horizontal', 'top'), //top-right
      new Wall(127, 620, 650, 620, 'horizontal', 'bottom'),//bottom-left
      new Wall(735, 620, 1262, 620, 'horizontal', 'bottom'), //bottom-right
      new Wall(90, 123, 90, 580, 'vertical', 'left'), //left
      new Wall(1310, 123, 1310, 580, 'vertical', 'right'), //right
      //corners, clockwise starting from top-left
      new Wall(127, 80, 105, 60, '2-diag'),       
      new Wall(650, 80, 660, 55, '1-diag'),
      new Wall(735, 80, 725, 55, '2-diag'),
      new Wall(1262, 80, 1285, 60, '1-diag'),
      new Wall(1310, 123, 1340, 100, '1-diag'),
      new Wall(1310, 580, 1340, 605, '2-diag'),
      new Wall(1262, 620, 1290, 650, '2-diag'),
      new Wall(735, 620, 723, 650, '1-diag'),
      new Wall(650, 620, 660, 650, '2-diag'),
      new Wall(127, 620, 100, 650, '1-diag'),
      new Wall(90, 580, 60, 610, '1-diag'),
      new Wall(90, 123, 65, 100, '2-diag')
    ];

  }

  generatePockets() {
    return [
      new Pocket(65, 65),
      new Pocket(690, 50),
      new Pocket(1325, 65),
      new Pocket(1325, 640),
      new Pocket(690, 650),
      new Pocket(65, 640),
    ]
  }
  
}

module.exports = Table;