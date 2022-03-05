const Util = require("./util");
const Ball = require ("./ball.js");


class CueBall extends Ball {
  constructor() {
    super(0);

    this.ballInHand = true;
    this.behindTheLine = true;      
    this.canBeHit = false;
    this.canvas = document.getElementById("table");

    this.handleBallInHand();   
  }

  handleBallInHand() {
    this.canBeHit = false;
    this.ballInHand = true;

    const placeBall = function(e) {
      let [x, y] = Util.getCursorPos(e);
      this.vel[0] = 0;
      this.vel[1] = 0;

      if (this.behindTheLine) {
        this.pos[0] = Util.clamp(x, 890, 1125);
        this.pos[1] = Util.clamp(y, 80, 530);   
      } else {
        this.pos[0] = Util.clamp(x, 65, 1125);
        this.pos[1] = Util.clamp(y, 80, 530);  
      }  
      
      this.canvas.addEventListener("click", () => {    
        this.ballInHand = false;        
        this.behindTheLine = false;
        this.canBeHit = true;
        this.canvas.removeEventListener("mousemove", placeBall);             
      }, {once: true})           
    }.bind(this);

    this.canvas.addEventListener("mousemove", placeBall)    
  }      

  calcHit(e) {
    // console.log(this.getCursorPos(canvas, e)); 
    let [x, y] = Util.getCursorPos(e);                    
    let cx = this.pos[0];
    let cy = this.pos[1];
    let vec = [(x - cx) / -100, (y - cy) / -100]      
    let power = Math.log(Util.getPointDistance(x, y, cx, cy));    
    let vel = [vec[0] * power, vec[1] * power]   
  
    this.hitCue(vel);      
  
  }

  hitCue(vel) {    
    this.vel = vel.map( num => {
      if (num < -51) {
        return -50;
      } else if (num > 51) {
        return 50;
      } else {
        return num;
      }
    })  
  }

  handleScratch() {    
    this.resetBall();
    this.handleBallInHand();  
  }
}

module.exports = CueBall;