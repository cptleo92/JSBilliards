const Util = require("./util");
const Ball = require ("./ball.js");


class CueBall extends Ball {
  constructor() {
    super(0);

    this.ballInHand = true;
    this.behindTheLine = true;   
    this.canBeHit = false;    
    this.canvas = document.getElementById("table");

    this.init();    
  }

  init() {
    this.handleBallInHand();  
  }
  
  handleBallInHand() {    
    const placeBall = function(e) {
      let [x, y] = Util.getCursorPos(e);
      this.vel[0] = 0;
      this.vel[1] = 0;

      if (this.behindTheLine) {
        this.pos[0] = Math.max(1040 , x);
        this.pos[1] = y;   
      } else {
        this.pos[0] = x;
        this.pos[1] = y;   
      }      

      this.canvas.addEventListener("click", e => {
        this.ballInHand = false;
        this.canBeHit = true;    
        this.behindTheLine = false;
        this.canvas.removeEventListener("mousemove", placeBall);
        this.bindClickToHit();
      })           
    }.bind(this);
    
    this.canvas.addEventListener("mousemove", placeBall)  
  }    

  bindClickToHit() {  
    const cue = this;
    if (this.canBeHit) {
      this.canvas.addEventListener("click", e => {
        // console.log(this.getCursorPos(canvas, e)); 
        let [x, y] = Util.getCursorPos(e);                    
        let cx = cue.pos[0];
        let cy = cue.pos[1];
        let vec = [(x - cx) / 100, (y - cy) / 100]      
        let power = Math.log(Util.getPointDistance(x, y, cx, cy));    
        let vel = [vec[0] * power, vec[1] * power]
        
        if (cue.vel[0] === 0 && cue.vel[1] === 0) {
          cue.hitCue(vel);      
        }
      });
    }
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