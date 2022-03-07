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
    this.resetButton();

    let table = document.getElementById("table");
    let info = document.querySelector(".info");
    let instructions = document.querySelector(".instructions");
    let text = document.querySelector(".animate-flicker");

    requestAnimationFrame(this.animate.bind(this))   

    setTimeout(() => {
      text.innerHTML = "Click anywhere to continue!"
      window.addEventListener("click", () => {    
        table.classList.remove("hidden");        
        info.classList.remove("hidden");
        instructions.classList.add("hidden");    
      }, {once: true})    
    }, 3500);       
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
    const reset = document.querySelector("button");   

    reset.addEventListener("click", () => {
      this.table.resetTable();
    })
  }

}

module.exports = GameView;