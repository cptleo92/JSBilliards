const RADIUS = 35;

class Pocket {
  constructor(x, y) {
    this.radius = RADIUS;
    this.x = x;
    this.y = y;
  }

  draw (ctx) {   
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.stroke();
  }
}

module.exports = Pocket;