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
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);

    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.font = '12px sans serif'
    ctx.fillStyle = "black";
    ctx.fillText(this.num, this.pos[0], this.pos[1] + 4);     
    ctx.textAlign = "center";
  }

  move(timeDelta) {
    const velScale = timeDelta / (1000 / 60);
    let x = this.pos[0];
    let y = this.pos[1];
    let dx = this.vel[0] * velScale;
    let dy = this.vel[1] * velScale;

    this.pos = [x + dx, y + dy];
    this.collideEdge();
    
    if (dx !== 0) {
      Math.abs(dx) < .1 ? this.vel[0] = 0 : this.vel[0] *= .99;
    }

    if (dy !== 0) {
      Math.abs(dy) < .1 ? this.vel[1] = 0 : this.vel[1] *= .99;
    }
  }

  collideEdge() {
    let x = this.pos[0];
    let y = this.pos[1];

    if (x < 15) {
      this.pos[0] = 15;
      this.vel[0] *= -1;      
    }

    if (x > 1185) {
      this.pos[0] = 1185;
      this.vel[0] *= -1;    
    }

    if (y < 15) {
      this.pos[1] = 15;
      this.vel[1] *= -1;      
    }

    if (y > 585) {
      this.pos[1] = 585;
      this.vel[1] *= -1;
    }
  }  
}

module.exports = Ball;