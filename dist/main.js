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

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nconst RADIUS = 18;\n\nclass Ball {\n  constructor (num) {\n    this.num = num;\n    this.type = this.getType(num);\n    this.radius = RADIUS;\n    this.size = this.radius * 2;\n    this.pos = [0,0];\n    this.vel = [0,0];\n    this.img = new Image();\n    this.img.src = `../src/assets/images/ball_${this.num}.png`\n    this.wallCollided = false;\n    this.onTable = true;\n    this.isStationary = (this.vel[0] === 0 && this.vel[1] === 0); \n    this.sinking = false;\n  }\n\n  resetBall() {\n    this.vel[0] = 0;\n    this.vel[1] = 0;\n    this.size = this.radius * 2;\n    this.onTable = true;\n    this.sinking = false;\n  }\n\n  getType(num) {\n    if (num < 8) {\n      return \"solid\";\n    } else if (num > 8) {\n      return \"stripe\";\n    } else if (num === 0) {\n      return \"white\"\n    } else if (num === 8) {\n      return \"eight\"\n    }\n  }\n\n  draw(ctx) {      \n    if (this.onTable) {     \n      ctx.drawImage(this.img, this.pos[0] - this.radius, this.pos[1] - this.radius, this.size, this.size);   \n    }\n\n    if (this.sinking && this.size >= 0) {\n      ctx.drawImage(this.img, this.pos[0] - this.radius, this.pos[1] - this.radius, this.size--, this.size--);\n    }\n  }\n\n  move(timeDelta) {\n    const velScale = timeDelta / (25);\n    let x = this.pos[0];\n    let y = this.pos[1];\n    let dx = this.vel[0] * velScale;\n    let dy = this.vel[1] * velScale;\n\n    this.pos = [x + dx, y + dy]; \n    \n    if (dx !== 0) {\n      Math.abs(dx) < .1 ? this.vel[0] = 0 : this.vel[0] *= .99;\n    }\n\n    if (dy !== 0) {\n      Math.abs(dy) < .1 ? this.vel[1] = 0 : this.vel[1] *= .99;\n    }\n  }\n\n  collideEdge(wall) {\n    let vx = this.vel[0];\n    let vy = this.vel[1];\n    let notCollided = true;\n\n    if (notCollided) {\n      if (wall.type === 'horizontal') {\n        this.vel = [vx, -vy];\n      } else if (wall.type === 'vertical') {\n        this.vel = [-vx, vy];\n      } else if (wall.type === '1-diag') {\n        this.vel = [-vy, -vx];\n      } else if (wall.type === '2-diag') {\n        this.vel = [vy, vx];\n      } \n      notCollided = false;\n    }\n\n    setTimeout( () => {\n      notCollided = true;\n    }, 100);\n      \n    //fix pos to avoid sticking onto walls\n    let buffer = 3;\n    if (wall.location === 'top') {\n      this.pos[1] += buffer;\n    } else if (wall.location === 'bottom') {\n      this.pos[1] -= buffer;\n    } else if (wall.location === 'left') {\n      this.pos[0] += buffer;\n    } else if (wall.location === 'right') {\n      this.pos[0] -= buffer;\n    }\n  }  \n\n  sink() {\n    this.onTable = false;\n    this.vel[0] = 0;\n    this.vel[1] = 0;\n    this.sinking = true;    \n  }\n}\n\nmodule.exports = Ball;\n\n//# sourceURL=webpack://Billiards/./src/ball.js?");

/***/ }),

/***/ "./src/cue_ball.js":
/*!*************************!*\
  !*** ./src/cue_ball.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst Ball = __webpack_require__ (/*! ./ball.js */ \"./src/ball.js\");\n\n\nclass CueBall extends Ball {\n  constructor() {\n    super(0);\n\n    this.ballInHand = true;\n    this.behindTheLine = true;   \n    this.canBeHit = false;    \n    this.canvas = document.getElementById(\"table\");\n\n    this.init();    \n  }\n\n  init() {\n    this.handleBallInHand();  \n  }\n  \n  handleBallInHand() {    \n    const placeBall = function(e) {\n      let [x, y] = Util.getCursorPos(e);\n      this.vel[0] = 0;\n      this.vel[1] = 0;\n\n      if (this.behindTheLine) {\n        this.pos[0] = Math.max(1040 , x);\n        this.pos[1] = y;   \n      } else {\n        this.pos[0] = x;\n        this.pos[1] = y;   \n      }      \n\n      this.canvas.addEventListener(\"click\", e => {\n        this.ballInHand = false;\n        this.canBeHit = true;    \n        this.behindTheLine = false;\n        this.canvas.removeEventListener(\"mousemove\", placeBall);\n        this.bindClickToHit();\n      })           \n    }.bind(this);\n    \n    this.canvas.addEventListener(\"mousemove\", placeBall)  \n  }    \n\n  bindClickToHit() {  \n    const cue = this;\n    if (this.canBeHit) {\n      this.canvas.addEventListener(\"click\", e => {\n        // console.log(this.getCursorPos(canvas, e)); \n        let [x, y] = Util.getCursorPos(e);                    \n        let cx = cue.pos[0];\n        let cy = cue.pos[1];\n        let vec = [(x - cx) / 100, (y - cy) / 100]      \n        let power = Math.log(Util.getPointDistance(x, y, cx, cy));    \n        let vel = [vec[0] * power, vec[1] * power]\n        \n        if (cue.vel[0] === 0 && cue.vel[1] === 0) {\n          cue.hitCue(vel);      \n        }\n      });\n    }\n  }\n\n  hitCue(vel) {    \n    this.vel = vel.map( num => {\n      if (num < -51) {\n        return -50;\n      } else if (num > 51) {\n        return 50;\n      } else {\n        return num;\n      }\n    })  \n  }\n\n  handleScratch() {\n    this.resetBall();\n    this.handleBallInHand();  \n  }\n}\n\nmodule.exports = CueBall;\n\n//# sourceURL=webpack://Billiards/./src/cue_ball.js?");

/***/ }),

/***/ "./src/game-view.js":
/*!**************************!*\
  !*** ./src/game-view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\nclass GameView {\n  constructor(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n    this.lastTime = 0;       \n\n    window.requestAnimationFrame(this.animate.bind(this));\n\n  }\n\n  animate(time) {\n    const timeDelta = time - this.lastTime;\n\n    this.game.moveBalls(timeDelta);\n    this.game.detectCollisions();\n    this.game.detectWallCollisions();\n    this.game.detectPocketed();\n    this.draw();\n    this.lastTime = time;\n    window.requestAnimationFrame(this.animate.bind(this));\n  }    \n\n  draw () {   \n    this.game.table.draw(this.ctx);      \n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack://Billiards/./src/game-view.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Table = __webpack_require__(/*! ./table.js */ \"./src/table.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\nconst CueBall = __webpack_require__(/*! ./cue_ball.js */ \"./src/cue_ball.js\");\n\nclass Game {\n  constructor (canvas, ctx) {\n    this.table = new Table(canvas, ctx);\n    this.pockets = this.table.pockets;\n    this.walls = this.table.walls;\n    this.balls = this.table.balls;\n    this.cue = this.table.balls[0];\n    this.ctx = ctx;\n  }\n  moveBalls(timeDelta) {\n    this.balls.forEach( ball1 => {\n      ball1.move(timeDelta);        \n    })\n  }\n\n  detectCollisions() {   \n    \n    let obj1;\n    let obj2;    \n    let colDist = this.cue.radius * 2.1;\n    \n    for (let i = 0; i < 16; i++) {\n      obj1 = this.balls[i];        \n      if (!obj1.onTable) {continue};\n      for (let j = i + 1; j < 16; j++)\n      {\n        obj2 = this.balls[j];    \n        if (!obj2.onTable) {continue};\n        if (Util.getDistance(obj1, obj2) <= colDist) {    \n          Util.ballCollisionMath(obj1, obj2);\n        } \n        \n      }\n    }\n  }\n\n  detectWallCollisions() {\n    for (let i = 0; i < 16; i++) {\n      let ball = this.balls[i];      \n      if (!ball.onTable && ball.isStationary) {continue}\n\n      let bx = ball.pos[0];\n      let by = ball.pos[1];\n\n      for (let j = 0; j < 18; j++) {\n        let wall = this.walls[j];\n        let wx1 = wall.x1;\n        let wx2 = wall.x2;\n        let wy1 = wall.y1;\n        let wy2 = wall.y2;\n\n        //find closest point on wall\n        let wallLen = Util.getPointDistance(wx1, wy1, wx2, wy2);\n        let dot = ( ((bx - wx1) * (wx2 - wx1)) + ((by - wy1) * (wy2 - wy1)) ) / Math.pow(wallLen, 2);\n        let closestX = wx1 + (dot * (wx2 - wx1));        \n        let closestY = wy1 + (dot * (wy2 - wy1));        \n\n        //make sure closest point is on the line\n        if (!wall.isPointCollide(closestX, closestY)) {\n          continue;\n        }\n\n        let distance = Util.getPointDistance(bx, by, closestX, closestY);\n\n        if (distance <= ball.radius) {    \n          ball.collideEdge(wall);\n        }                \n      }\n    }\n  }\n\n  detectPocketed() {\n    for (let i = 0; i < 16; i++) {\n      let ball = this.balls[i];      \n      if (!ball.onTable && ball.isStationary) {continue}\n\n      for (let j = 0; j < 6; j++) {\n        let pocket = this.pockets[j];\n        let r = pocket.radius;\n\n        let dist = Util.getPointDistance(ball.pos[0], ball.pos[1], pocket.x, pocket.y);    \n\n        if (dist <= r) {          \n          ball.sink();\n          if (ball instanceof CueBall) {\n            setTimeout( () => { ball.handleScratch()}, 2000)           \n          }\n        }\n      }\n    }\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://Billiards/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// const Ball = require(\"./ball.js\");\n// const Table = require(\"./table.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst GameView = __webpack_require__(/*! ./game-view.js */ \"./src/game-view.js\")\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", event => {\n  const canvas = document.getElementById(\"table\");\n  const ctx = canvas.getContext('2d');\n  canvas.width = 1400;\n  canvas.height = 700; \n\n  let game = new Game(canvas, ctx);\n  let gameView = new GameView(game, ctx);\n  gameView.draw(); \n\n  document.addEventListener(\"keydown\", event => {\n    if (event.key === \"Tab\") {\n      game.table.resetTable();\n    }\n  })\n\n})\n\n\n//# sourceURL=webpack://Billiards/./src/index.js?");

/***/ }),

/***/ "./src/pocket.js":
/*!***********************!*\
  !*** ./src/pocket.js ***!
  \***********************/
/***/ ((module) => {

eval("const RADIUS = 35;\n\nclass Pocket {\n  constructor(x, y) {\n    this.radius = RADIUS;\n    this.x = x;\n    this.y = y;\n  }\n\n  draw (ctx) {   \n    ctx.beginPath();\n    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);\n    ctx.strokeStyle = \"red\";\n    ctx.lineWidth = 5;\n    ctx.stroke();\n  }\n}\n\nmodule.exports = Pocket;\n\n//# sourceURL=webpack://Billiards/./src/pocket.js?");

/***/ }),

/***/ "./src/table.js":
/*!**********************!*\
  !*** ./src/table.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Pocket = __webpack_require__(/*! ./pocket.js */ \"./src/pocket.js\");\nconst Wall = __webpack_require__(/*! ./wall.js */ \"./src/wall.js\");\nconst Ball = __webpack_require__ (/*! ./ball.js */ \"./src/ball.js\");\nconst CueBall = __webpack_require__(/*! ./cue_ball.js */ \"./src/cue_ball.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass Table {\n  constructor (canvas, ctx) {\n    this.ctx = ctx;\n\n    this.balls = this.generateBalls();\n    this.positionBalls();\n\n    this.walls = this.generateWalls();\n    \n    this.pockets = this.generatePockets();\n\n    this.width = canvas.width;\n    this.height = this.width / 2;\n\n    this.img = new Image();\n    this.img.src = \"../src/assets/images/table.png\"\n  }\n\n  generateBalls () {\n    const balls = [];\n    for(let i = 0; i <= 15; i++) {\n      let ball;\n      if (i === 0) {\n        ball = new CueBall(i);\n        balls.push(ball);\n      } else {\n        ball = new Ball(i);\n        balls.push(ball);\n      }\n    }    \n    return balls;\n  }\n\n  draw(ctx) {     \n    ctx.drawImage(this.img, 0, 0, this.width, this.height);   \n    this.balls.forEach( (ball) => { ball.draw(this.ctx) } );     \n    // this.pockets.forEach( (pocket) => { pocket.draw(this.ctx) } ); \n  }\n\n  resetTable() {\n    for (const ball of this.balls) {\n      ball.resetBall();\n    }\n    this.positionBalls();\n  }\n\n  positionBalls () {     \n\n    let x = 375;\n    let y = 325;\n    this.balls[0].pos = [1050, y];\n\n    let r = this.balls[0].radius;\n    let d = (r * 2) ;\n    \n    this.balls[1].pos = [x, y];\n\n    this.balls[2].pos = [x - d, y - r];\n    this.balls[3].pos = [x - d, y + r];\n\n    this.balls[4].pos = [x - (d * 2), y - d];\n    this.balls[8].pos = [x - (d * 2), y];\n    this.balls[5].pos = [x - (d * 2), y + d];\n\n    this.balls[6].pos = [x - (d * 3), y + r];\n    this.balls[7].pos = [x - (d * 3), y + (d + r)];   \n    this.balls[9].pos = [x - (d * 3), y - (d + r)];\n    this.balls[10].pos = [x - (d * 3), y - r];\n\n    this.balls[11].pos = [x - (d * 4), y - d];\n    this.balls[12].pos = [x - (d * 4), y];\n    this.balls[13].pos = [x - (d * 4), y + d];\n    this.balls[14].pos = [x - (d * 4), y + (d * 2)];\n    this.balls[15].pos = [x - (d * 4), y - (d * 2)];\n  }\n\n  generateWalls() {\n    return [\n      new Wall(127, 80, 650, 80, 'horizontal', 'top'), //top-left\n      new Wall(735, 80, 1262, 80, 'horizontal', 'top'), //top-right\n      new Wall(127, 620, 650, 620, 'horizontal', 'bottom'),//bottom-left\n      new Wall(735, 620, 1262, 620, 'horizontal', 'bottom'), //bottom-right\n      new Wall(90, 123, 90, 580, 'vertical', 'left'), //left\n      new Wall(1310, 123, 1310, 580, 'vertical', 'right'), //right\n      //corners, clockwise starting from top-left\n      new Wall(127, 80, 105, 60, '2-diag'),       \n      new Wall(650, 80, 660, 55, '1-diag'),\n      new Wall(735, 80, 725, 55, '2-diag'),\n      new Wall(1262, 80, 1285, 60, '1-diag'),\n      new Wall(1310, 123, 1340, 100, '1-diag'),\n      new Wall(1310, 580, 1340, 605, '2-diag'),\n      new Wall(1262, 620, 1290, 650, '2-diag'),\n      new Wall(735, 620, 723, 650, '1-diag'),\n      new Wall(650, 620, 660, 650, '2-diag'),\n      new Wall(127, 620, 100, 650, '1-diag'),\n      new Wall(90, 580, 60, 610, '1-diag'),\n      new Wall(90, 123, 65, 100, '2-diag')\n    ];\n\n  }\n\n  generatePockets() {\n    return [\n      new Pocket(65, 65),\n      new Pocket(690, 50),\n      new Pocket(1325, 65),\n      new Pocket(1325, 640),\n      new Pocket(690, 650),\n      new Pocket(65, 640),\n    ]\n  }\n  \n}\n\nmodule.exports = Table;\n\n//# sourceURL=webpack://Billiards/./src/table.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  getDistance: function (b1, b2) {\n    let x1 = b1.pos[0];\n    let x2 = b2.pos[0];\n    let y1 = b1.pos[1];\n    let y2 = b2.pos[1];\n    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));\n  },\n  \n  getPointDistance: function (x1, y1, x2, y2) {\n    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));\n  },\n\n  ballCollisionMath: function (obj1, obj2) {\n    let vCollision = {x: obj2.pos[0] - obj1.pos[0], y: obj2.pos[1] - obj1.pos[1]};\n    let distance = Math.sqrt((obj2.pos[0]-obj1.pos[0])*(obj2.pos[0]-obj1.pos[0]) + (obj2.pos[1]-obj1.pos[1])*(obj2.pos[1]-obj1.pos[1]));\n    let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};\n    let vRelativeVelocity = {x: obj1.vel[0] - obj2.vel[0], y: obj1.vel[1] - obj2.vel[1]};\n    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;\n\n    if (speed < 0) {\n      return;\n    }\n\n    obj1.vel[0] -= (speed * vCollisionNorm.x);\n    obj1.vel[1] -= (speed * vCollisionNorm.y);\n    obj2.vel[0] += (speed * vCollisionNorm.x);\n    obj2.vel[1] += (speed * vCollisionNorm.y);\n  },\n\n  getCursorPos: function (e) {\n    // const rect = canvas.getBoundingClientRect();\n    const x = e.clientX - 94\n    const y = e.clientY - 80\n    return [x, y];\n  }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack://Billiards/./src/util.js?");

/***/ }),

/***/ "./src/wall.js":
/*!*********************!*\
  !*** ./src/wall.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass Wall {\n  constructor(x1, y1, x2, y2, type, location) {   \n    this.color = \"red\";\n\n    this.x1 = x1;\n    this.x2 = x2;\n    this.y1 = y1;\n    this.y2 = y2;  \n\n    this.type = type;\n    this.location = location;\n  }\n\n  // draw(ctx) {\n  //   ctx.moveTo(this.x1, this.y1);\n  //   ctx.lineTo(this.x2, this.y2);\n  //   ctx.strokeStyle = this.color;\n  //   ctx.lineWidth = 3;\n  //   ctx.stroke();    \n  // }\n\n  isPointCollide(x, y) {\n    let dist1 = Util.getPointDistance(this.x1, this.y1, x, y);\n    let dist2 = Util.getPointDistance(this.x2, this.y2, x, y);\n    let wallLength = Util.getPointDistance(this.x1, this.y1, this.x2, this.y2);\n\n    let buffer = 0.2;\n\n    if (dist1 + dist2 >= wallLength - buffer && dist1 + dist2 <= wallLength + buffer) {\n      return true;\n    }\n    return false;\n  }\n  \n}\n\nmodule.exports = Wall;\n\n//# sourceURL=webpack://Billiards/./src/wall.js?");

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