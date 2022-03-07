const Util = require("./util.js")

class Stick {
  constructor() {    
    this.img = new Image();
    this.img.src = 'src/assets/images/cue.png';
    this.visible = true;    
    this.rotating = true;
    this.shooting = false;

    this.canvas = document.getElementById("table");
    this.canvas.addEventListener("mousemove", e => {
      if (this.rotating) {      
        [this.mouseX, this.mouseY] = Util.getCursorPos(e);
      }
    })
  }

  draw(ctx, cue) {
    let dist = 20 + (cue.power * 2);

    if (this.visible) {  
      let x = cue.pos[0];
      let y = cue.pos[1];
      let offset = cue.radius / 2 + 3;
      let opposite = this.mouseY - y;
      let adjacent = this.mouseX - x;    
      ctx.save();
      ctx.translate(x, y);        
      ctx.rotate(Math.atan2((opposite) * -1, adjacent * -1));    
      ctx.translate(-x, -y);        
      ctx.drawImage(this.img, x + dist, y - offset);
      ctx.restore(); 
    }      
  }

}

module.exports = Stick;