const Table = require("./table.js");
const Util = require("./util.js")
// const Ball= require("./ball.js");

class Game {
  constructor (canvas, ctx) {
    this.table = new Table(canvas, ctx);
    this.walls = this.table.walls;
    this.balls = this.table.balls;
    this.cue = this.table.balls[0];
    this.ctx = ctx;

    this.bindClickToHit(canvas);
  }

  getCursorPos (canvas, e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return [x, y];
  }

  bindClickToHit(canvas) {
    // canvas.addEventListener("click", e => {      
    //   this.ctx.moveTo(this.cue.pos[0], this.cue.pos[1]);
    //   this.ctx.lineTo(e.clientX, e.clientY);
    //   this.ctx.strokeStyle = "black";
    //   this.ctx.lineWidth = 3;
    //   // console.log(e.clientX)
    //   this.ctx.stroke();
    // })

    canvas.addEventListener("click", e => {
      let [x, y] = this.getCursorPos(canvas, e);      
      let cx = this.cue.pos[0];
      let cy = this.cue.pos[1];
      let vec = [(x - cx) / 100, (y - cy) / 100]      
      let power = Math.log(Util.getPointDistance(x, y, cx, cy));    
      let vel = [vec[0] * power, vec[1] * power];
      console.log([x, y]);
      console.log([cx, cy]);
      this.hitCue(vel);
    });
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

            if (Util.getDistance(obj1, obj2) <= 35) {    
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

  detectWallCollisions() {
    for (let i = 0; i < this.balls.length; i++) {
      let ball = this.balls[i];
      let bx = ball.pos[0];
      let by = ball.pos[1];

      for (let j = 0; j < this.walls.length; j++) {
        let wall = this.walls[j];
        let wx1 = wall.x1;
        let wx2 = wall.x2;
        let wy1 = wall.y1;
        let wy2 = wall.y2;

        //find closest point on wall
        let wallLen = Util.getPointDistance(wx1, wy1, wx2, wy2);
        let dot = ( ((bx - wx1) * (wx2 - wx1)) + ((by - wy1) * (wy2 - wy1)) ) / Math.pow(wallLen, 2);
        let closestX = wx1 + (dot * (wx2 - wx1));        
        let closestY = wy1 + (dot * (wy2 - wy1));        

        //make sure closest point is on the line
        if (!wall.isPointCollide(closestX, closestY)) {
          continue;
        }

        let distance = Util.getPointDistance(bx, by, closestX, closestY);

        if (distance <= ball.radius) {                   
          ball.collideEdge(wall);
        }                
      }
    }
  }
}

module.exports = Game;