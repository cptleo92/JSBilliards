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
    this.pocketed = [];

    this.width = canvas.width;
    this.height = this.width / 2;

    this.solidSection = document.querySelector(".info-bottom-left");
    this.stripeSection = document.querySelector(".info-bottom-right");

    // this.test();
  }

  test() {
    for (let i = 1; i <= 5; i++) {
      this.balls[i].sink();
      this.pocketed.push(this.balls[i]);
    }
  }

  generateBalls () {
    const balls = [];
    for(let i = 0; i <= 15; i++) {
      let ball;
      if (i === 0) {
        ball = new CueBall();
        balls.push(ball);
      } else {
        ball = new Ball(i);
        balls.push(ball);
      }
    }    
    return balls;
  }
  
  drawPocketed() {
    this.pocketed.forEach( ball => {
      if (ball.type === 'solid') {
        this.solidSection.appendChild(ball.img);
      } else {
        this.stripeSection.appendChild(ball.img);
      }
    })
  }

  resetTable() {
    for (const ball of this.balls) {         
      ball.resetBall();
      if (ball instanceof CueBall) {ball.handleBallInHand()}
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
    this.balls[8].pos = [x - (d * 2), y];

    const POSITIONS = [
      [x - d, y - r], 
      [x - d, y + r],
      [x - (d * 2), y - d],
      [x - (d * 2), y + d],
      [x - (d * 3), y + r],
      [x - (d * 3), y + (d + r)],
      [x - (d * 3), y - (d + r)],
      [x - (d * 3), y - r],
      [x - (d * 4), y - d],
      [x - (d * 4), y],
      [x - (d * 4), y + d],
      [x - (d * 4), y + (d * 2)],
      [x - (d * 4), y - (d * 2)]
    ]

    const REMAINING = [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];

    for(let i = 0; i < 13; i++) {
      let idx = Math.floor(Math.random() * REMAINING.length);
      this.balls[REMAINING[idx]].pos = POSITIONS[i];
      REMAINING.splice(idx, 1); 
    }
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