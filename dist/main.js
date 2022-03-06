/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nconst RADIUS = 15;\n\nclass Ball {\n  constructor (num) {\n    this.num = num;\n    this.type = this.getType(num);\n    this.radius = RADIUS;\n    this.size = this.radius * 2;\n    this.pos = [0,0];\n    this.vel = [0,0];\n    this.wallCollided = false;\n    this.onTable = true; \n    this.sinking = false;\n\n    this.img = new Image();    \n    this.img.src = `src/assets/images/ball_${this.num}.png`\n\n  }\n\n  isStationary() {\n    return (this.vel[0] === 0 && this.vel[1] === 0);\n  }\n  \n  resetBall() {\n    this.vel[0] = 0;\n    this.vel[1] = 0;\n    this.size = this.radius * 2;\n    this.onTable = true;\n    this.sinking = false;\n  }\n\n  getType(num) {\n    if (num === 0) {\n      return \"white\"\n    } else if (num < 8) {\n      return \"solid\";\n    } else if (num > 8) {\n      return \"stripe\";\n    } else if (num === 8) {\n      return \"eight\"\n    }\n  }\n\n  draw(ctx) {      \n    if (this.onTable) {     \n      ctx.drawImage(this.img, \n        Math.round(this.pos[0] - this.radius), \n        Math.round(this.pos[1] - this.radius),\n        this.size,\n        this.size\n      );\n    }\n\n    if (this.sinking && this.size >= 0) {\n      ctx.drawImage(this.img, this.pos[0] - this.radius, this.pos[1] - this.radius, this.size--, this.size--);\n    }\n  }\n\n  move(timeDelta) {\n    const velScale = timeDelta / (25);\n    let x = this.pos[0];\n    let y = this.pos[1];\n    let dx = this.vel[0] * velScale;\n    let dy = this.vel[1] * velScale;\n\n    this.pos = [x + dx, y + dy]; \n    \n    if (dx !== 0) {\n      Math.abs(dx) < .05 ? this.vel[0] = 0 : this.vel[0] *= .992;\n    }\n\n    if (dy !== 0) {\n      Math.abs(dy) < .05 ? this.vel[1] = 0 : this.vel[1] *= .992;\n    }\n\n    if ((x > 1180 || x < 20) || (y < 20 || y > 580)) {\n      this.resetBall();\n      this.pos = [\n        Math.floor(Math.random() * 1000) + 200, \n        Math.floor(Math.random() * 600) + 50, \n        ];\n    } \n    \n  }\n\n  collideEdge(wall) {\n    let vx = this.vel[0];\n    let vy = this.vel[1];\n    let notCollided = true;\n\n    if (notCollided) {\n      if (wall.type === 'horizontal') {\n        this.vel = [vx, -vy];\n      } else if (wall.type === 'vertical') {\n        this.vel = [-vx, vy];\n      } else if (wall.type === '1-diag') {\n        this.vel = [-vy, -vx];\n      } else if (wall.type === '2-diag') {\n        this.vel = [vy, vx];\n      } \n      notCollided = false;\n    }\n\n    setTimeout( () => {\n      notCollided = true;\n    }, 100);\n      \n    //fix pos to avoid sticking onto walls\n    let buffer = 3;\n    if (wall.location === 'top') {\n      this.pos[1] += buffer;\n    } else if (wall.location === 'bottom') {\n      this.pos[1] -= buffer;\n    } else if (wall.location === 'left') {\n      this.pos[0] += buffer;\n    } else if (wall.location === 'right') {\n      this.pos[0] -= buffer;\n    }\n  }  \n\n  sink() {\n    this.onTable = false;\n    this.vel[0] = 0;\n    this.vel[1] = 0;\n    this.sinking = true;    \n  }\n}\n\nmodule.exports = Ball;\n\n//# sourceURL=webpack://Billiards/./src/ball.js?");

/***/ }),

/***/ "./src/cue_ball.js":
/*!*************************!*\
  !*** ./src/cue_ball.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ball = __webpack_require__ (/*! ./ball.js */ \"./src/ball.js\");\nconst Power = __webpack_require__(/*! ./power.js */ \"./src/power.js\");\n\nclass CueBall extends Ball {\n  constructor() {\n    super(0);\n\n    this.ballInHand = true;\n    this.behindTheLine = true;      \n    this.canBeHit = false;\n    this.canvas = document.getElementById(\"table\");\n    this.ctx = this.canvas.getContext('2d');\n    this.power = 1;\n\n    this.handleBallInHand();   \n  }\n\n  handleBallInHand() {\n    this.canBeHit = false;\n    this.ballInHand = true;\n\n    const placeBall = function(e) {\n      let [x, y] = Util.getCursorPos(e);\n      this.vel[0] = 0;\n      this.vel[1] = 0;\n\n      if (this.behindTheLine) {\n        this.pos[0] = Util.clamp(x, 890, 1125);\n        this.pos[1] = Util.clamp(y, 80, 530);   \n      } else {\n        this.pos[0] = Util.clamp(x, 65, 1125);\n        this.pos[1] = Util.clamp(y, 80, 530);  \n      }  \n      \n      this.canvas.addEventListener(\"click\", () => {    \n        this.ballInHand = false;        \n        this.behindTheLine = false;\n        this.canBeHit = true;\n        this.canvas.removeEventListener(\"mousemove\", placeBall);             \n      }, {once: true})           \n    }.bind(this);\n\n    this.canvas.addEventListener(\"mousemove\", placeBall)    \n  }      \n\n  calcHit(e, callback) { \n    let [x, y] = Util.getCursorPos(e);                    \n    let cx = this.pos[0];\n    let cy = this.pos[1];\n    let dist = Util.getPointDistance(x, y, cx, cy);  \n    let vec = [(x - cx) / dist, (y - cy) / dist]      \n    // console.log(power);  \n    this.holdMouseForPower( (power) => {\n      let vel = [vec[0] * power, vec[1] * power]     \n      console.log('vec before power: ' + vec)\n      console.log('vel after power: ' + vel);\n      console.log('power: ' + power)\n      this.hitCue(vel, callback);          \n    });\n    \n  }\n\n  holdMouseForPower(callback) {   \n    let increasing = true; \n    const minPower = 1;\n    const maxPower = 50;\n    const increment = 2;   \n    \n    const powerCounter = () => {\n      const interval = setInterval(() => {\n        if (this.power <= maxPower && increasing) {\n          this.power += increment;\n        } else {\n          increasing = false;\n        }\n        \n        if (this.power >= minPower && !increasing) {\n          this.power -= increment;\n        } else {\n          increasing = true;  \n        }\n      }, 50);      \n\n      const clearCounter = () => {\n        clearInterval(interval);\n        this.canvas.removeEventListener(\"mousedown\", powerCounter);\n        callback(this.power);\n        this.power = 1;\n      }\n  \n      this.canvas.addEventListener(\"mouseup\", clearCounter, {once: true});     \n    }\n    this.canvas.addEventListener(\"mousedown\", powerCounter);\n  }\n\n  hitCue(vel, callback) {    \n    // console.log('hit cue');\n    this.vel = vel.map( num => {\n      if (num < -51) {\n        return -50;\n      } else if (num > 51) {\n        return 50;\n      } else {\n        callback();\n        return num;\n      }\n    })  \n  }\n\n  handleScratch() {    \n    this.resetBall();\n    this.handleBallInHand();  \n  }\n}\n\nmodule.exports = CueBall;\n\n//# sourceURL=webpack://Billiards/./src/cue_ball.js?");

/***/ }),

/***/ "./src/game-view.js":
/*!**************************!*\
  !*** ./src/game-view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Stick = __webpack_require__(/*! ./stick.js */ \"./src/stick.js\")\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst Power = __webpack_require__(/*! ./power.js */ \"./src/power.js\");\n\nclass GameView {\n  constructor(game, ctx) {\n    this.game = game;\n    this.table = this.game.table;\n    this.ctx = ctx;\n    this.lastTime = 0;       \n\n    this.info = document.querySelector(\".info\");    \n    this.init();  \n  }\n\n  init() {\n    requestAnimationFrame(this.animate.bind(this))        \n  }\n\n  animate(time) {\n    const timeDelta = time - this.lastTime;\n    this.game.update(timeDelta);\n    this.draw();\n    this.lastTime = time;\n    requestAnimationFrame(this.animate.bind(this));\n  }    \n\n  draw () {   \n    this.ctx.clearRect(0, 0, this.table.width, this.table.height);\n    this.game.table.balls.forEach( (ball) => ball.draw(this.ctx));\n    // this.game.table.pockets.forEach( (pocket) => pocket.draw(this.ctx))\n    this.game.table.drawPocketed();\n    \n    if (!this.game.cue.ballInHand) {\n      this.game.stick.draw(this.ctx, this.game.cue);\n    }  \n  }\n\n  resetButton() {    \n    const reset = document.createElement(\"button\");   \n    reset.innerHTML = \"Reset Table\";\n    this.info.appendChild(reset);\n\n    reset.addEventListener(\"click\", () => {\n      this.table.resetTable();\n    })\n  }\n\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack://Billiards/./src/game-view.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst Table = __webpack_require__(/*! ./table.js */ \"./src/table.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\nconst CueBall = __webpack_require__(/*! ./cue_ball.js */ \"./src/cue_ball.js\");\nconst Stick = __webpack_require__(/*! ./stick.js */ \"./src/stick.js\")\n\nclass Game {\n  constructor (canvas, ctx) {\n    this.canvas = canvas;\n    this.table = new Table(canvas, ctx);\n    this.pockets = this.table.pockets;\n    this.walls = this.table.walls;\n    this.balls = this.table.balls;\n    this.cue = this.table.balls[0];\n    this.ctx = ctx;\n\n    this.players = [new Player(1), new Player(2)];\n    this.waitForHit = true;\n    this.openBreak = true;    \n    this.currentPlayer = this.players[0];    \n    this.otherPlayer = this.players[1];\n    this.pocketed = null;\n    this.firstBallHit = null;\n    this.scratched = false;\n\n    this.stick = new Stick(this.canvas);\n\n    this.play();\n    this.updateTracker();\n\n    // setInterval(() => {\n    //   console.log('cue pos: ' + this.cue.pos)\n    //   console.log('cue vel: ' + this.cue.vel)\n    // }, 500);\n  }\n\n  play() {  \n    const clickToHit = (e) => {  \n      if (this.cue.canBeHit && this.waitForHit) {\n        this.stick.rotating = false;\n        this.cue.calcHit(e, () => {        \n          this.waitForHit = false;        \n          this.stick.visible = false;\n        });\n      }\n    }      \n    this.canvas.addEventListener(\"click\", clickToHit);    \n  }\n\n  update(timeDelta) {    \n    this.moveBalls(timeDelta);\n    this.detectCollisions();\n    this.detectWallCollisions();\n    this.detectPocketed();\n    \n    if (!this.waitForHit) {\n      this.checkStopped();\n    }\n  }\n\n  checkStopped() {\n    if (this.balls.every( ball => ball.isStationary())) {\n      this.waitForHit = true;\n      this.endOfTurn();\n    }\n  }\n\n  endOfTurn() {\n    let checkBalls = this.table.pocketed.filter(ball => ball.type === this.currentPlayer.ballType)\n    if (checkBalls.length === 7) {\n      this.currentPlayer.lastBall = true\n      console.log(`Player ${this.currentPlayer.num} is on the 8!`)\n    };\n\n    if (!this.balls[8].onTable) {\n      this.gameOver();\n    }\n\n    this.checkScratch();\n    if (this.scratched) {\n      this.cue.handleScratch();     \n      this.resolveTurn(true);\n    } else if (this.pocketed !== null) {   \n        let type = this.pocketed.type;\n        console.log(`pocketed ${type}`)\n\n        if (this.openBreak && type !== 'white') {\n          this.assignType(type);\n          this.openBreak = false;           \n          this.resolveTurn(false);    \n        } else if (type !== this.currentPlayer.ballType) {          \n          this.resolveTurn(true);\n        } else {\n          this.resolveTurn(false);\n        }\n    } else {\n      this.resolveTurn(true);\n    }   \n  }\n\n  resolveTurn(switchPlayer) {\n    this.pocketed = null; \n    this.waitForHit = true; \n    this.firstBallHit = null;\n    this.scratched = false\n    if (switchPlayer) {this.switchTurn()};\n    this.updateTracker();\n\n    this.stick.visible = true;\n    this.stick.rotating = true;\n  }\n\n  switchTurn() {\n    this.players.reverse();\n    this.currentPlayer = this.players[0];    \n    this.otherPlayer = this.players[1];\n  }\n\n  updateTracker() {\n    const player = this.currentPlayer.num;\n    const turn = this.currentPlayer.ballType;\n    const p = document.querySelector(\".tracker\");\n\n    if (turn === null) {\n      p.innerHTML = `It is Player ${player}'s turn! Open table!`\n    } else {\n      p.innerHTML = `It is Player ${player}'s turn! You are ${turn}.`\n    }\n  }\n\n  assignType(type) {\n    if (type === 'solid') {\n      this.currentPlayer.ballType = 'solid';\n      this.otherPlayer.ballType = 'stripe';\n    } else if (type === 'stripe') {\n      this.currentPlayer.ballType = 'stripe';\n      this.otherPlayer.ballType = 'solid';\n    }\n  }\n\n  moveBalls(timeDelta) {\n    this.balls.forEach( ball1 => {\n      ball1.move(timeDelta);        \n    })\n  }\n  \n  \n\n  detectCollisions() {       \n    let obj1;\n    let obj2;    \n    let colDist = this.cue.radius * 2.1;    \n    \n    for (let i = 0; i < 16; i++) {\n      obj1 = this.balls[i];        \n      if (!obj1.onTable) {continue};\n      for (let j = i + 1; j < 16; j++)\n      {\n        obj2 = this.balls[j];    \n        if (!obj2.onTable) {continue};\n        if (Util.getDistance(obj1, obj2) <= colDist) {              \n          Util.ballCollisionMath(obj1, obj2);\n\n          if (obj1 instanceof CueBall && !this.firstBallHit && !obj1.ballInHand) {\n            this.firstBallHit = obj2;          \n          }\n\n        } \n        \n      }\n    }   \n  }  \n\n  detectWallCollisions() {\n    for (let i = 0; i < 16; i++) {\n      let ball = this.balls[i];      \n      if (!ball.onTable && ball.isStationary) {continue}\n\n      let bx = ball.pos[0];\n      let by = ball.pos[1];\n\n      for (let j = 0; j < 18; j++) {\n        let wall = this.walls[j];\n        let wx1 = wall.x1;\n        let wx2 = wall.x2;\n        let wy1 = wall.y1;\n        let wy2 = wall.y2;\n\n        //find closest point on wall\n        let wallLen = Util.getPointDistance(wx1, wy1, wx2, wy2);\n        let dot = ( ((bx - wx1) * (wx2 - wx1)) + ((by - wy1) * (wy2 - wy1)) ) / Math.pow(wallLen, 2);\n        let closestX = wx1 + (dot * (wx2 - wx1));        \n        let closestY = wy1 + (dot * (wy2 - wy1));        \n\n        //make sure closest point is on the line\n        if (!wall.isPointCollide(closestX, closestY)) {\n          continue;\n        }\n\n        let distance = Util.getPointDistance(bx, by, closestX, closestY);\n\n        if (distance <= ball.radius) {    \n          ball.collideEdge(wall);\n        }                \n      }\n    }\n  }\n\n  detectPocketed() {\n    for (let i = 0; i < 16; i++) {\n      let ball = this.balls[i];      \n      if (!ball.onTable && ball.isStationary) {continue}\n      if (ball instanceof CueBall && ball.ballInHand) {continue}\n\n      for (let j = 0; j < 6; j++) {\n        let pocket = this.pockets[j];\n        let r = pocket.radius;\n\n        let dist = Util.getPointDistance(ball.pos[0], ball.pos[1], pocket.x, pocket.y);    \n\n        if (dist <= r) {          \n          ball.sink();\n          if (ball.type === 'solid' || ball.type === 'stripe') {\n            this.table.pocketed.push(ball);\n          }\n          if (!this.pocketed && ball.type !== 'white') {            \n            this.pocketed = ball;            \n          }\n          if (ball instanceof CueBall && !ball.ballInHand) {\n            this.scratched = true;  \n          }\n        }\n      }\n    }\n  }  \n\n  checkScratch() {\n    if (this.firstBallHit === null) {\n      this.scratched = true;\n    } else if (this.firstBallHit.type === 'eight') {\n      if (!this.currentPlayer.lastBall) {\n        this.scratched = true;\n      }\n    } else {\n      if (this.currentPlayer.ballType !== this.firstBallHit.type && !this.openBreak) {  \n        this.scratched = true;      \n      }  \n    }\n  }\n\n  gameOver() {\n    let type = this.currentPlayer.ballType;\n    let checkBalls = this.table.pocketed.filter( ball => ball.type === type );\n    console.log(checkBalls);\n    if (checkBalls.length === 7 && !this.scratched) {\n      alert(`Player ${this.currentPlayer.num} wins!`)\n    } else {\n      alert(`Player ${this.currentPlayer.num} loses!`)\n    }   \n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://Billiards/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// const Ball = require(\"./ball.js\");\n// const Table = require(\"./table.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst GameView = __webpack_require__(/*! ./game-view.js */ \"./src/game-view.js\")\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", event => {\n  const canvas = document.getElementById(\"table\");\n  const ctx = canvas.getContext('2d');\n  canvas.width = 1200;\n  canvas.height = 600; \n\n  let game = new Game(canvas, ctx);\n  let gameView = new GameView(game, ctx);\n \n  document.addEventListener(\"click\", e => {\n    console.log(Util.getCursorPos(e));\n  })\n  \n})\n\n\n//# sourceURL=webpack://Billiards/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module) => {

eval("class Player {\n  constructor(num) {\n    this.num = num;\n    this.ballType = null;    \n    this.lastBall = false;\n  }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://Billiards/./src/player.js?");

/***/ }),

/***/ "./src/pocket.js":
/*!***********************!*\
  !*** ./src/pocket.js ***!
  \***********************/
/***/ ((module) => {

eval("const RADIUS = 28;\n\nclass Pocket {\n  constructor(x, y) {\n    this.radius = RADIUS;\n    this.x = x;\n    this.y = y;\n  }\n  \n  draw(ctx) {\n    ctx.beginPath();\n    ctx.lineWidth = 3;\n    ctx.strokeStyle = \"red\";\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.stroke();\n  }\n}\n\nmodule.exports = Pocket;\n\n//# sourceURL=webpack://Billiards/./src/pocket.js?");

/***/ }),

/***/ "./src/power.js":
/*!**********************!*\
  !*** ./src/power.js ***!
  \**********************/
/***/ ((module) => {

eval("// not currently implemented\n\nclass Power {\n  constructor() {\n    this.img = new Image();\n    this.img.src = 'src/assets/images/BlueBar.png'   \n    this.visible = false;\n  }\n\n  draw(power, cue, ctx) {\n    if (this.visible) {\n      let [x, y] = cue.pos;\n      ctx.drawImage(this.img,x - 50, y + 20, this.getWidth(power), 200);    \n    }\n    // 60, 350, 900, 200 src info\n  }\n\n  getWidth(power) {\n    let coef = 900 / 7;\n    return power * coef;\n  }\n}\n\nmodule.exports = Power;\n\n//# sourceURL=webpack://Billiards/./src/power.js?");

/***/ }),

/***/ "./src/stick.js":
/*!**********************!*\
  !*** ./src/stick.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\n\nclass Stick {\n  constructor(cue) {    \n    this.img = new Image();\n    this.img.src = 'src/assets/images/cue.png';\n    this.visible = true;    \n    this.rotating = true;\n    this.shooting = false;\n\n    this.canvas = document.getElementById(\"table\");\n    this.canvas.addEventListener(\"mousemove\", e => {\n      if (this.rotating) {      \n        [this.mouseX, this.mouseY] = Util.getCursorPos(e);\n      }\n    })\n  }\n\n  draw(ctx, cue) {\n    let dist = 20 + (cue.power * 2);\n\n    if (this.visible) {  \n      let x = cue.pos[0];\n      let y = cue.pos[1];\n      let offset = cue.radius / 2 + 3;\n      let opposite = this.mouseY - y;\n      let adjacent = this.mouseX - x;    \n      ctx.save();\n      ctx.translate(x, y);        \n      ctx.rotate(Math.atan2((opposite) * -1, adjacent * -1));    \n      ctx.translate(-x, -y);        \n      ctx.drawImage(this.img, x + dist, y - offset);\n      ctx.restore();\n\n    //   if (this.shooting) {\n    //     if (dist >= 0) {\n    //       ctx.drawImage(this.img, x + dist, y - offset);\n    //       dist--;\n    //       console.log(dist);\n    //       if (dist <= 0) {\n    //         this.shooting = false;\n    //         this.visible = false;\n    //       }\n    //     }\n    //   }\n    }      \n  }\n\n}\n\nmodule.exports = Stick;\n\n//# sourceURL=webpack://Billiards/./src/stick.js?");

/***/ }),

/***/ "./src/table.js":
/*!**********************!*\
  !*** ./src/table.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Pocket = __webpack_require__(/*! ./pocket.js */ \"./src/pocket.js\");\nconst Wall = __webpack_require__(/*! ./wall.js */ \"./src/wall.js\");\nconst Ball = __webpack_require__ (/*! ./ball.js */ \"./src/ball.js\");\nconst CueBall = __webpack_require__(/*! ./cue_ball.js */ \"./src/cue_ball.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass Table {\n  constructor (canvas, ctx) {\n    this.ctx = ctx;\n\n    this.balls = this.generateBalls();\n    this.positionBalls();\n\n    this.walls = this.generateWalls();\n    \n    this.pockets = this.generatePockets();\n    this.pocketed = [];\n\n    this.width = canvas.width;\n    this.height = this.width / 2;\n\n    this.solidSection = document.querySelector(\".info-bottom-left\");\n    this.stripeSection = document.querySelector(\".info-bottom-right\"); \n\n    // this.test();\n  }\n\n  test() {\n    for (let i = 1; i <= 5; i++) {\n      this.balls[i].sink();\n      this.pocketed.push(this.balls[i]);\n    }\n  }\n\n  generateBalls () {\n    const balls = [];\n    for(let i = 0; i <= 15; i++) {\n      let ball;\n      if (i === 0) {\n        ball = new CueBall();\n        balls.push(ball);\n      } else {\n        ball = new Ball(i);\n        balls.push(ball);\n      }\n    }    \n    return balls;\n  }\n  \n  drawPocketed() {\n    this.pocketed.forEach( ball => {\n      if (ball.type === 'solid') {\n        this.solidSection.appendChild(ball.img);\n      } else {\n        this.stripeSection.appendChild(ball.img);\n      }\n    })\n  }\n\n  resetTable() {\n    for (const ball of this.balls) {         \n      ball.resetBall();\n      if (ball instanceof CueBall) {ball.handleBallInHand()}\n    }\n    this.positionBalls();\n  }\n\n  positionBalls () { \n    let x = 325;\n    let y = 300;\n\n    let r = this.balls[0].radius;\n    let d = (r * 2) ;\n    \n    this.balls[1].pos = [x, y];\n    this.balls[8].pos = [x - (d * 2), y];\n\n    const POSITIONS = [\n      [x - d, y - r], \n      [x - d, y + r],\n      [x - (d * 2), y - d],\n      [x - (d * 2), y + d],\n      [x - (d * 3), y + r],\n      [x - (d * 3), y + (d + r)],\n      [x - (d * 3), y - (d + r)],\n      [x - (d * 3), y - r],\n      [x - (d * 4), y - d],\n      [x - (d * 4), y],\n      [x - (d * 4), y + d],\n      [x - (d * 4), y + (d * 2)],\n      [x - (d * 4), y - (d * 2)]\n    ]\n\n    const REMAINING = [2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14, 15];\n\n    for(let i = 0; i < 13; i++) {\n      let idx = Math.floor(Math.random() * REMAINING.length);\n      this.balls[REMAINING[idx]].pos = POSITIONS[i];\n      REMAINING.splice(idx, 1); \n    }\n  }\n\n  generateWalls() {\n    return [\n      new Wall(109, 67, 555, 67, 'horizontal', 'top'), //top-left\n      new Wall(631, 67, 1080, 67, 'horizontal', 'top'), //top-right\n      new Wall(109, 530, 555, 530, 'horizontal', 'bottom'),//bottom-left\n      new Wall(631, 530, 1080, 530, 'horizontal', 'bottom'), //bottom-right\n      new Wall(76, 104, 76, 495, 'vertical', 'left'), //left\n      new Wall(1120, 104, 1120, 495, 'vertical', 'right'), //right\n      // corners, clockwise starting from top-left\n      new Wall(109, 67, 88, 50, '2-diag'),       \n      new Wall(555, 67, 567, 52, '1-diag'),\n      new Wall(631, 67, 622, 52, '2-diag'),\n      new Wall(1080, 67, 1105, 52, '1-diag'),\n      new Wall(1120, 104, 1150, 80, '1-diag'),\n      new Wall(1120, 495, 1150, 520, '2-diag'),\n      new Wall(1080, 530, 1105, 555, '2-diag'),\n      new Wall(631, 530, 622, 555, '1-diag'),\n      new Wall(555, 530, 564, 555, '2-diag'),\n      new Wall(109, 530, 88, 555, '1-diag'),\n      new Wall(76, 495, 55, 520, '1-diag'),\n      new Wall(76, 104, 55, 85, '2-diag')\n    ];\n\n  }\n\n  generatePockets() {\n    return [\n      new Pocket(58, 58),\n      new Pocket(592, 43),\n      new Pocket(1132, 58),\n      new Pocket(1132, 545),\n      new Pocket(592, 558),\n      new Pocket(58, 545),\n    ]\n  }\n  \n}\n\nmodule.exports = Table;\n\n//# sourceURL=webpack://Billiards/./src/table.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  getDistance: function (b1, b2) {\n    let x1 = b1.pos[0];\n    let x2 = b2.pos[0];\n    let y1 = b1.pos[1];\n    let y2 = b2.pos[1];\n    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));\n  },\n  \n  getPointDistance: function (x1, y1, x2, y2) {\n    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));\n  },\n\n  ballCollisionMath: function (obj1, obj2) {\n    let vCollision = {x: obj2.pos[0] - obj1.pos[0], y: obj2.pos[1] - obj1.pos[1]};\n    let distance = Math.sqrt((obj2.pos[0]-obj1.pos[0])*(obj2.pos[0]-obj1.pos[0]) + (obj2.pos[1]-obj1.pos[1])*(obj2.pos[1]-obj1.pos[1]));\n    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};\n    let vRelativeVelocity = {x: obj1.vel[0] - obj2.vel[0], y: obj1.vel[1] - obj2.vel[1]};\n    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;\n\n    if (speed < 0) {\n      return;\n    }\n\n    obj1.vel[0] -= (speed * vCollisionNorm.x);\n    obj1.vel[1] -= (speed * vCollisionNorm.y);\n    obj2.vel[0] += (speed * vCollisionNorm.x);\n    obj2.vel[1] += (speed * vCollisionNorm.y);\n  },\n\n  getCursorPos: function (e) {\n    const canvas = document.getElementById(\"table\");\n    const rect = canvas.getBoundingClientRect();\n    const x = (e.clientX - rect.left) / (rect.right - rect.left) * canvas.width\n    const y = (e.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height\n    return [x, y];\n  },\n\n  clamp: function (val, min, max) {\n    return val > max ? max : val < min ? min : val;\n  }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack://Billiards/./src/util.js?");

/***/ }),

/***/ "./src/wall.js":
/*!*********************!*\
  !*** ./src/wall.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass Wall {\n  constructor(x1, y1, x2, y2, type, location) {   \n    this.color = \"red\";\n\n    this.x1 = x1;\n    this.x2 = x2;\n    this.y1 = y1;\n    this.y2 = y2;  \n\n    this.type = type;\n    this.location = location;\n  }\n\n  draw(ctx) {\n    ctx.moveTo(this.x1, this.y1);\n    ctx.lineTo(this.x2, this.y2);\n    ctx.strokeStyle = this.color;\n    ctx.lineWidth = 3;\n    ctx.stroke();    \n  }\n\n  isPointCollide(x, y) {\n    let dist1 = Util.getPointDistance(this.x1, this.y1, x, y);\n    let dist2 = Util.getPointDistance(this.x2, this.y2, x, y);\n    let wallLength = Util.getPointDistance(this.x1, this.y1, this.x2, this.y2);\n\n    let buffer = 0.2;\n\n    if (dist1 + dist2 >= wallLength - buffer && dist1 + dist2 <= wallLength + buffer) {\n      return true;\n    }\n    return false;\n  }\n  \n}\n\nmodule.exports = Wall;\n\n//# sourceURL=webpack://Billiards/./src/wall.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;