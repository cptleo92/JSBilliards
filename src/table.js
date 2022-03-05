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
    let x = 325;
    let y = 300;

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
      new Wall(109, 67, 555, 67, 'horizontal', 'top'), //top-left
      new Wall(631, 67, 1080, 67, 'horizontal', 'top'), //top-right
      new Wall(109, 530, 555, 530, 'horizontal', 'bottom'),//bottom-left
      new Wall(631, 530, 1080, 530, 'horizontal', 'bottom'), //bottom-right
      new Wall(76, 104, 76, 495, 'vertical', 'left'), //left
      new Wall(1120, 104, 1120, 495, 'vertical', 'right'), //right
      // corners, clockwise starting from top-left
      new Wall(109, 67, 88, 50, '2-diag'),       
      new Wall(555, 67, 567, 52, '1-diag'),
      new Wall(631, 67, 622, 52, '2-diag'),
      new Wall(1080, 67, 1105, 52, '1-diag'),
      new Wall(1120, 104, 1150, 80, '1-diag'),
      new Wall(1120, 495, 1150, 520, '2-diag'),
      new Wall(1080, 530, 1105, 555, '2-diag'),
      new Wall(631, 530, 622, 555, '1-diag'),
      new Wall(555, 530, 564, 555, '2-diag'),
      new Wall(109, 530, 88, 555, '1-diag'),
      new Wall(76, 495, 55, 520, '1-diag'),
      new Wall(76, 104, 55, 85, '2-diag')
    ];

  }

  generatePockets() {
    return [
      new Pocket(58, 58),
      new Pocket(592, 43),
      new Pocket(1132, 58),
      new Pocket(1132, 545),
      new Pocket(592, 558),
      new Pocket(58, 545),
    ]
  }
  
}

module.exports = Table;