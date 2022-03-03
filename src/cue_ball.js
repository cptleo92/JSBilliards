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

    // setInterval( () => {
    //   console.log(this);
    // }, 500)
  }

  init() {
    this.handleBallInHand();  
    this.bindClickToHit();   
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
      
      this.canvas.addEventListener("click", () => {    
        this.ballInHand = false;        
        this.behindTheLine = false;
        this.canBeHit = true;
        this.canvas.removeEventListener("mousemove", placeBall);             
      })           
    }.bind(this);
    
    this.canvas.addEventListener("mousemove", placeBall)  
    
  }    

  bindClickToHit() {      
    this.canvas.addEventListener("click", e => {      
      if (this.canBeHit) {
        this.calcHit(e);       
      };
    }); 
  }

  calcHit(e) {
    // console.log(this.getCursorPos(canvas, e)); 
    let [x, y] = Util.getCursorPos(e);                    
    let cx = this.pos[0];
    let cy = this.pos[1];
    let vec = [(x - cx) / 100, (y - cy) / 100]      
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
    this.ballInHand = true;
    this.canBeHit = false;
    this.resetBall();
    this.handleBallInHand();  
  }
}

module.exports = CueBall;