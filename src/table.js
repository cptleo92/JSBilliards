const Wall = require("./wall.js");
const Ball = require ("./ball.js");
const Util = require("./util.js");

class Table {
  constructor (canvas, ctx) {
    this.ctx = ctx;

    this.balls = this.generateBalls();
    this.positionBalls();

    this.walls = this.generateWalls();
    // this.positionWalls();

    this.width = canvas.width;
    this.height = canvas.height;

    this.img = new Image();
    this.img.src = "../src/assets/images/table.png"
  }

  generateBalls () {
    const balls = [];
    for(let i = 0; i <= 15; i++) {
      let ball = new Ball(i);
      balls.push(ball);
    }    
    return balls;
  }

  draw(ctx) {     
    ctx.drawImage(this.img, 0, 0, this.width, this.height);   
    this.balls.forEach( (ball) => { ball.draw(this.ctx) } );     
  }

  positionBalls () { 
    this.balls[0].pos = [1050, 325];

    let x = 325;
    let y = 325;
    
    this.balls[1].pos = [x, y];

    this.balls[2].pos = [x - 26, y - 15];
    this.balls[3].pos = [x - 26, y + 15];

    this.balls[4].pos = [x - 52, y - 30];
    this.balls[8].pos = [x - 52, y];
    this.balls[5].pos = [x - 52, y + 30];

    this.balls[6].pos = [x - 78, y + 15];
    this.balls[7].pos = [x - 78, y + 45];   
    this.balls[9].pos = [x - 78, y - 45];
    this.balls[10].pos = [x - 78, y - 15];

    this.balls[11].pos = [x - 104, y - 30];
    this.balls[12].pos = [x - 104, y];
    this.balls[13].pos = [x - 104, y + 30];
    this.balls[14].pos = [x - 104, y + 60];
    this.balls[15].pos = [x - 104, y - 60];
  }

  generateWalls() {
    return [
      new Wall(this.ctx, 127, 80, 650, 80, 'horizontal'), //top-left
      new Wall(this.ctx, 735, 80, 1262, 80, 'horizontal'), //top-right
      new Wall(this.ctx, 127, 620, 650, 620, 'horizontal'),//bottom-left
      new Wall(this.ctx, 735, 620, 1262, 620, 'horizontal'), //bottom-right
      new Wall(this.ctx, 90, 123, 90, 580, 'vertical'), //left
      new Wall(this.ctx, 1310, 123, 1310, 580, 'vertical'), //right
      //corners, clockwise starting from top-left
      new Wall(this.ctx, 127, 80, 105, 60, '2-diag'),       
      new Wall(this.ctx, 650, 80, 660, 60, '1-diag'),
      new Wall(this.ctx, 735, 80, 727, 60, '2-diag'),
      new Wall(this.ctx, 1262, 80, 1285, 60, '1-diag'),
      new Wall(this.ctx, 1310, 123, 1340, 100, '1-diag'),
      new Wall(this.ctx, 1310, 580, 1340, 605, '2-diag'),
      new Wall(this.ctx, 1262, 620, 1290, 650, '2-diag'),
      new Wall(this.ctx, 735, 620, 723, 650, '1-diag'),
      new Wall(this.ctx, 650, 620, 660, 650, '2-diag'),
      new Wall(this.ctx, 127, 620, 100, 650, '1-diag'),
      new Wall(this.ctx, 90, 580, 60, 610, '1-diag'),
      new Wall(this.ctx, 90, 123, 65, 100, '2-diag')
    ];

  }
  
}

module.exports = Table;