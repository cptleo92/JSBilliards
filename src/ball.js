const Util = require("./util");

const RADIUS = 15;
const COLORS = ["yellow", "blue", "red", "purple", "orange", "green", "maroon"]

class Ball {
  constructor (num, pos, vel = [0,0]) {
    this.num = num;
    this.color = this.getColor(num);
    this.type = this.getType(num);
    this.radius = RADIUS;
    this.pos = pos;
    this.vel = vel;

    this.img = new Image();
    this.img.src = `../src/assets/images/ball_${this.num}.png`

    this.wallCollided = false;
  }
  
  getColor(num) {
    if (num < 8 && num !== 0) {
      return COLORS[num - 1];
    } else if (num > 8) {
      return COLORS[num - 9];
    } else if (num === 8) {
      return "black";
    } else {
      return "white";
    }
  }

  getType(num) {
    if (num < 8) {
      return "solid";
    } else if (num > 8) {
      return "stripe";
    }
  }

  draw(ctx) {           
    ctx.drawImage(this.img, this.pos[0] - 15, this.pos[1] - 15, this.radius * 2, this.radius * 2);   
  }

  move(timeDelta) {
    const velScale = timeDelta / (1000 / 40);
    let x = this.pos[0];
    let y = this.pos[1];
    let dx = this.vel[0] * velScale;
    let dy = this.vel[1] * velScale;

    this.pos = [x + dx, y + dy]; 
    
    if (dx !== 0) {
      Math.abs(dx) < .1 ? this.vel[0] = 0 : this.vel[0] *= .99;
    }

    if (dy !== 0) {
      Math.abs(dy) < .1 ? this.vel[1] = 0 : this.vel[1] *= .99;
    }
  }

  collideEdge(wall) {
    let vx = this.vel[0];
    let vy = this.vel[1];

    if (this.wallCollided === false) {
      if (wall.type === 'horizontal') {
        this.vel = [vx, -vy];
      } else if (wall.type === 'vertical') {
        this.vel = [-vx, vy];
      } else if (wall.type === '1-diag') {
        this.vel = [-vy, -vx];
      } else if (wall.type === '2-diag') {
        this.vel = [vy, vx];
      } else if (wall.type === '3-diag') {
        this.vel = []
      }
      this.wallCollided = true;
    }

    setTimeout( () => {
      this.wallCollided = false;
    }, 100)
  }  
}

module.exports = Ball;