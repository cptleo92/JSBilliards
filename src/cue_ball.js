const Util = require("./util");
const Ball = require ("./ball.js");
const Power = require("./power.js");

class CueBall extends Ball {
  constructor() {
    super(0);

    this.ballInHand = true;
    this.behindTheLine = true;      
    this.canBeHit = false;
    this.canvas = document.getElementById("table");
    this.ctx = this.canvas.getContext('2d');
    this.power = 1;

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

  calcHit(e, callback) { 
    let [x, y] = Util.getCursorPos(e);                    
    let cx = this.pos[0];
    let cy = this.pos[1];
    let dist = Util.getPointDistance(x, y, cx, cy);  
    let vec = [(x - cx) / dist, (y - cy) / dist]      
    // console.log(power);  
    this.holdMouseForPower( (power) => {
      let vel = [vec[0] * power, vec[1] * power]     
      this.hitCue(vel, callback);          
    });
    
  }

  holdMouseForPower(callback) {   
    let increasing = true; 
    const minPower = 1;
    const maxPower = 50;
    const increment = 2;   
    
    const powerCounter = () => {
      const interval = setInterval(() => {
        if (this.power <= maxPower && increasing) {
          this.power += increment;
        } else {
          increasing = false;
        }
        
        if (this.power >= minPower && !increasing) {
          this.power -= increment;
        } else {
          increasing = true;  
        }
      }, 50);      

      const clearCounter = () => {
        clearInterval(interval);
        this.canvas.removeEventListener("mousedown", powerCounter);
        callback(this.power);
        this.power = 1;
      }
  
      this.canvas.addEventListener("mouseup", clearCounter, {once: true});     
    }
    this.canvas.addEventListener("mousedown", powerCounter);
  }

  hitCue(vel, callback) {    
    // console.log('hit cue');
    this.vel = vel.map( num => {
      if (num < -51) {
        return -50;
      } else if (num > 51) {
        return 50;
      } else {
        callback();
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