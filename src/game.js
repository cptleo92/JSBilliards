const Table = require("./table.js");
const Util = require("./util.js")
// const Ball= require("./ball.js");

class Game {
  constructor (canvas) {
    this.table = new Table(canvas);
    this.balls = this.table.balls;
    this.cue = this.table.balls[0];
  }


  hitCue(vel) {
    this.cue.vel = vel;

  }

  moveBalls(timeDelta) {
    this.balls.forEach( ball1 => {
      ball1.move(timeDelta);        
    })
  }

  detectCollisions() {
    // this whole section was taken from spicyyoghurt.com's tutorial on collision detection physics
    
    let obj1;
    let obj2;    
    
    for (let i = 0; i < this.balls.length; i++) {
        obj1 = this.balls[i];        
        for (let j = i + 1; j < this.balls.length; j++)
        {
            obj2 = this.balls[j];

            if (Util.getDistance(obj1, obj2) <= 31) {    
              let vCollision = {x: obj2.pos[0] - obj1.pos[0], y: obj2.pos[1] - obj1.pos[1]};
              let distance = Math.sqrt((obj2.pos[0]-obj1.pos[0])*(obj2.pos[0]-obj1.pos[0]) + (obj2.pos[1]-obj1.pos[1])*(obj2.pos[1]-obj1.pos[1]));
              let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};
              let vRelativeVelocity = {x: obj1.vel[0] - obj2.vel[0], y: obj1.vel[1] - obj2.vel[1]};
              let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

              if (speed < 0) {
                  break;
              }
        
              obj1.vel[0] -= (speed * vCollisionNorm.x);
              obj1.vel[1] -= (speed * vCollisionNorm.y);
              obj2.vel[0] += (speed * vCollisionNorm.x);
              obj2.vel[1] += (speed * vCollisionNorm.y);
          }
        }
    }
  }
}

module.exports = Game;