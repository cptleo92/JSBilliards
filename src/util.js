const Util = {
  getDistance: function (b1, b2) {
    let x1 = b1.pos[0];
    let x2 = b2.pos[0];
    let y1 = b1.pos[1];
    let y2 = b2.pos[1];
    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
  },
  
  getPointDistance: function (x1, y1, x2, y2) {
    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));
  }
}

module.exports = Util;