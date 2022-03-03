const Util = require("./util.js");

class Wall {
  constructor(x1, y1, x2, y2, type, location) {   
    this.color = "red";

    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;  

    this.type = type;
    this.location = location;
  }

  // draw(ctx) {
  //   ctx.moveTo(this.x1, this.y1);
  //   ctx.lineTo(this.x2, this.y2);
  //   ctx.strokeStyle = this.color;
  //   ctx.lineWidth = 3;
  //   ctx.stroke();    
  // }

  isPointCollide(x, y) {
    let dist1 = Util.getPointDistance(this.x1, this.y1, x, y);
    let dist2 = Util.getPointDistance(this.x2, this.y2, x, y);
    let wallLength = Util.getPointDistance(this.x1, this.y1, this.x2, this.y2);

    let buffer = 0.2;

    if (dist1 + dist2 >= wallLength - buffer && dist1 + dist2 <= wallLength + buffer) {
      return true;
    }
    return false;
  }
  
}

module.exports = Wall;