const RADIUS = 28;

class Pocket {
  constructor(x, y) {
    this.radius = RADIUS;
    this.x = x;
    this.y = y;
  }
  
  draw(ctx) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
  }
}

module.exports = Pocket;