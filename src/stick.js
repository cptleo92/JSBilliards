const Util = require("./util.js")

class Stick {
  constructor(cue) {    
    this.img = new Image();
    this.img.src = 'src/assets/images/cue.png';
    this.visible = true;    

    this.canvas = document.getElementById("table");
    this.canvas.addEventListener("mousemove", e => {
      [this.mouseX, this.mouseY] = Util.getCursorPos(e);
    })
  }

  draw(ctx, cue) {
    if (this.visible) {  
      let x = cue.pos[0];
      let y = cue.pos[1];
      let offset = cue.radius / 2;
      let opposite = this.mouseY - y;
      let adjacent = this.mouseX - x;
      let dist = Util.getPointDistance(this.mouseX, this.mouseY, x, y);      

      ctx.save();
      ctx.translate(x, y);        
      // ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.rotate(Math.atan2(opposite - offset, adjacent));
      ctx.translate(-x, -y);        
      ctx.drawImage(this.img, x + Math.sqrt(dist * 10), y - offset);
      ctx.restore();
    }   
  }

}

module.exports = Stick;