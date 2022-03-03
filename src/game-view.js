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
    this.game.detectWallCollisions();
    this.game.detectPocketed();
    this.draw();
    this.lastTime = time;
    window.requestAnimationFrame(this.animate.bind(this));
  }    

  draw () {   
    this.game.table.draw(this.ctx);      
  }
}

module.exports = GameView;