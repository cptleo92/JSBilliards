const Ball = require ("./ball.js");
const Util = require("./util.js");

class Table {
  constructor (canvas) {
    this.balls = this.generateBalls();
    this.positionBalls();

    this.width = canvas.width;
    this.height = canvas.height;
  }

  generateBalls () {
    const balls = [];
    for(let i = 0; i <= 15; i++) {
      let ball = new Ball(i);
      balls.push(ball);
    }    
    return balls;
  }

  positionBalls () { 
    this.balls[0].pos = [900, 300];

    this.balls[1].pos = [300, 300];

    this.balls[2].pos = [274, 285];
    this.balls[3].pos = [274, 315];

    this.balls[4].pos = [248, 270];
    this.balls[8].pos = [248, 300];
    this.balls[5].pos = [248, 330];

    this.balls[6].pos = [222, 315];
    this.balls[7].pos = [222, 345];   
    this.balls[9].pos = [222, 255];
    this.balls[10].pos = [222, 285];

    this.balls[11].pos = [196, 270];
    this.balls[12].pos = [196, 300];
    this.balls[13].pos = [196, 330];
    this.balls[14].pos = [196, 360];
    this.balls[15].pos = [196, 240];
  }
  
}

module.exports = Table;