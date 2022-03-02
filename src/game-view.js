const Game = require("./game.js")

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;

    window.requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.moveBalls(timeDelta);
    this.game.detectCollisions();
    this.draw();
    this.lastTime = time;
    window.requestAnimationFrame(this.animate.bind(this));
  }    

  draw () {
    this.ctx.clearRect(0, 0, 1200, 600); 

    this.ctx.beginPath();
    this.ctx.moveTo(900, 0);
    this.ctx.lineTo(900, 600);
    this.ctx.stroke();

    this.game.table.balls.forEach( (ball) => { ball.draw(this.ctx) } )   
  }
}

module.exports = GameView;