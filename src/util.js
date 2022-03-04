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
  },

  ballCollisionMath: function (obj1, obj2) {
    let vCollision = {x: obj2.pos[0] - obj1.pos[0], y: obj2.pos[1] - obj1.pos[1]};
    let distance = Math.sqrt((obj2.pos[0]-obj1.pos[0])*(obj2.pos[0]-obj1.pos[0]) + (obj2.pos[1]-obj1.pos[1])*(obj2.pos[1]-obj1.pos[1]));
    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
    let vRelativeVelocity = {x: obj1.vel[0] - obj2.vel[0], y: obj1.vel[1] - obj2.vel[1]};
    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

    if (speed < 0) {
      return;
    }

    obj1.vel[0] -= (speed * vCollisionNorm.x);
    obj1.vel[1] -= (speed * vCollisionNorm.y);
    obj2.vel[0] += (speed * vCollisionNorm.x);
    obj2.vel[1] += (speed * vCollisionNorm.y);
  },

  getCursorPos: function (e) {
    const canvas = document.getElementById("table");
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width
    const y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    return [x, y];
  },

  clamp: function (val, min, max) {
    return val > max ? max : val < min ? min : val;
  }
}

module.exports = Util;