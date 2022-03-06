const Stick = require("./stick.js")
const Util = require("./util.js");
const Power = require("./power.js");

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.table = this.game.table;
    this.ctx = ctx;
    this.lastTime = 0;       

    this.info = document.querySelector(".info");    
    this.init();  
  }

  init() {
    requestAnimationFrame(this.animate.bind(this))        
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
    this.game.table.balls.forEach( (ball) => ball.draw(this.ctx));
    // this.game.table.pockets.forEach( (pocket) => pocket.draw(this.ctx))
    this.game.table.drawPocketed();
    
    if (!this.game.cue.ballInHand) {
      this.game.stick.draw(this.ctx, this.game.cue);
    }  
  }

  resetButton() {    
    const reset = document.createElement("button");   
    reset.innerHTML = "Reset Table";
    this.info.appendChild(reset);

    reset.addEventListener("click", () => {
      this.table.resetTable();
    })
  }

}

module.exports = GameView;