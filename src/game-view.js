const Game = require("./game.js")

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.table = this.game.table;
    this.ctx = ctx;
    this.lastTime = 0;       

    this.init();  
  }

  init() {
    requestAnimationFrame(this.animate.bind(this))

    const info = document.querySelector(".info");
    const reset = document.createElement("button");   
    reset.innerHTML = "Reset Table";
    info.appendChild(reset);
    this.bindReset(reset);
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.update(timeDelta);
    this.draw();
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }    

  draw () {   
    this.ctx.clearRect(0, 0, this.table.width, this.table.height);
    this.game.table.balls.forEach( (ball) => { ball.draw(this.ctx) } );      
  }

  bindReset(btn) {
    btn.addEventListener("click", () => {
      this.table.resetTable();
    })
  }
}

module.exports = GameView;