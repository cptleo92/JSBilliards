// not currently implemented

class Power {
  constructor() {
    this.img = new Image();
    this.img.src = 'src/assets/images/BlueBar.png'   
    this.visible = false;
  }

  draw(power, cue, ctx) {
    if (this.visible) {
      let [x, y] = cue.pos;
      ctx.drawImage(this.img,x - 50, y + 20, this.getWidth(power), 200);    
    }
    // 60, 350, 900, 200 src info
  }

  getWidth(power) {
    let coef = 900 / 7;
    return power * coef;
  }
}

module.exports = Power;