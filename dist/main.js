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

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nconst RADIUS = 15;\nconst COLORS = [\"yellow\", \"blue\", \"red\", \"purple\", \"orange\", \"green\", \"maroon\"]\n\nclass Ball {\n  constructor (num, pos, vel = [0,0]) {\n    this.num = num;\n    this.color = this.getColor(num);\n    this.type = this.getType(num);\n    this.radius = RADIUS;\n    this.pos = pos;\n    this.vel = vel;\n\n    this.img = new Image();\n    this.img.src = `../src/assets/images/ball_${this.num}.png`\n\n    this.wallCollided = false;\n  }\n  \n  getColor(num) {\n    if (num < 8 && num !== 0) {\n      return COLORS[num - 1];\n    } else if (num > 8) {\n      return COLORS[num - 9];\n    } else if (num === 8) {\n      return \"black\";\n    } else {\n      return \"white\";\n    }\n  }\n\n  getType(num) {\n    if (num < 8) {\n      return \"solid\";\n    } else if (num > 8) {\n      return \"stripe\";\n    }\n  }\n\n  draw(ctx) {           \n    ctx.drawImage(this.img, this.pos[0] - 15, this.pos[1] - 15, this.radius * 2, this.radius * 2);   \n  }\n\n  move(timeDelta) {\n    const velScale = timeDelta / (1000 / 40);\n    let x = this.pos[0];\n    let y = this.pos[1];\n    let dx = this.vel[0] * velScale;\n    let dy = this.vel[1] * velScale;\n\n    this.pos = [x + dx, y + dy]; \n    \n    if (dx !== 0) {\n      Math.abs(dx) < .1 ? this.vel[0] = 0 : this.vel[0] *= .99;\n    }\n\n    if (dy !== 0) {\n      Math.abs(dy) < .1 ? this.vel[1] = 0 : this.vel[1] *= .99;\n    }\n  }\n\n  collideEdge(wall) {\n    let vx = this.vel[0];\n    let vy = this.vel[1];\n\n    if (this.wallCollided === false) {\n      if (wall.type === 'horizontal') {\n        this.vel = [vx, -vy];\n      } else if (wall.type === 'vertical') {\n        this.vel = [-vx, vy];\n      } else if (wall.type === '1-diag') {\n        this.vel = [-vy, -vx];\n      } else if (wall.type === '2-diag') {\n        this.vel = [vy, vx];\n      } else if (wall.type === '3-diag') {\n        this.vel = []\n      }\n      this.wallCollided = true;\n    }\n\n    setTimeout( () => {\n      this.wallCollided = false;\n    }, 100)\n  }  \n}\n\nmodule.exports = Ball;\n\n//# sourceURL=webpack://Billiards/./src/ball.js?");

/***/ }),

/***/ "./src/game-view.js":
/*!**************************!*\
  !*** ./src/game-view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\nclass GameView {\n  constructor(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n    this.lastTime = 0;       \n\n    window.requestAnimationFrame(this.animate.bind(this));\n\n  }\n\n  animate(time) {\n    const timeDelta = time - this.lastTime;\n\n    this.game.moveBalls(timeDelta);\n    this.game.detectCollisions();\n    this.game.detectWallCollisions();\n    this.draw();\n    this.lastTime = time;\n    window.requestAnimationFrame(this.animate.bind(this));\n  }    \n\n  draw () {   \n    this.game.table.draw(this.ctx);\n    // this.game.table.walls.forEach( (wall) => { wall.draw(this.ctx) } );\n    // this.game.table.balls.forEach( (ball) => { ball.draw(this.ctx) } )   \n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack://Billiards/./src/game-view.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Table = __webpack_require__(/*! ./table.js */ \"./src/table.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\n// const Ball= require(\"./ball.js\");\n\nclass Game {\n  constructor (canvas, ctx) {\n    this.table = new Table(canvas, ctx);\n    this.walls = this.table.walls;\n    this.balls = this.table.balls;\n    this.cue = this.table.balls[0];\n    this.ctx = ctx;\n\n    this.bindClickToHit(canvas);\n  }\n\n  getCursorPos (canvas, e) {\n    const rect = canvas.getBoundingClientRect();\n    const x = e.clientX - rect.left;\n    const y = e.clientY - rect.top;\n    return [x, y];\n  }\n\n  bindClickToHit(canvas) {\n    // canvas.addEventListener(\"click\", e => {      \n    //   this.ctx.moveTo(this.cue.pos[0], this.cue.pos[1]);\n    //   this.ctx.lineTo(e.clientX, e.clientY);\n    //   this.ctx.strokeStyle = \"black\";\n    //   this.ctx.lineWidth = 3;\n    //   // console.log(e.clientX)\n    //   this.ctx.stroke();\n    // })\n\n    canvas.addEventListener(\"click\", e => {\n      let [x, y] = this.getCursorPos(canvas, e);      \n      let cx = this.cue.pos[0];\n      let cy = this.cue.pos[1];\n      let vec = [(x - cx) / 100, (y - cy) / 100]      \n      let power = Math.log(Util.getPointDistance(x, y, cx, cy));    \n      let vel = [vec[0] * power, vec[1] * power];\n      console.log([x, y]);\n      console.log([cx, cy]);\n      this.hitCue(vel);\n    });\n  }\n\n\n  hitCue(vel) {\n    this.cue.vel = vel;\n\n  }\n\n  moveBalls(timeDelta) {\n    this.balls.forEach( ball1 => {\n      ball1.move(timeDelta);        \n    })\n  }\n\n  detectCollisions() {\n    // this whole section was taken from spicyyoghurt.com's tutorial on collision detection physics\n    \n    let obj1;\n    let obj2;    \n    \n    for (let i = 0; i < this.balls.length; i++) {\n        obj1 = this.balls[i];        \n        for (let j = i + 1; j < this.balls.length; j++)\n        {\n            obj2 = this.balls[j];\n\n            if (Util.getDistance(obj1, obj2) <= 35) {    \n              let vCollision = {x: obj2.pos[0] - obj1.pos[0], y: obj2.pos[1] - obj1.pos[1]};\n              let distance = Math.sqrt((obj2.pos[0]-obj1.pos[0])*(obj2.pos[0]-obj1.pos[0]) + (obj2.pos[1]-obj1.pos[1])*(obj2.pos[1]-obj1.pos[1]));\n              let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};\n              let vRelativeVelocity = {x: obj1.vel[0] - obj2.vel[0], y: obj1.vel[1] - obj2.vel[1]};\n              let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;\n\n              if (speed < 0) {\n                  break;\n              }\n        \n              obj1.vel[0] -= (speed * vCollisionNorm.x);\n              obj1.vel[1] -= (speed * vCollisionNorm.y);\n              obj2.vel[0] += (speed * vCollisionNorm.x);\n              obj2.vel[1] += (speed * vCollisionNorm.y);\n          }\n        }\n    }\n  }\n\n  detectWallCollisions() {\n    for (let i = 0; i < this.balls.length; i++) {\n      let ball = this.balls[i];\n      let bx = ball.pos[0];\n      let by = ball.pos[1];\n\n      for (let j = 0; j < this.walls.length; j++) {\n        let wall = this.walls[j];\n        let wx1 = wall.x1;\n        let wx2 = wall.x2;\n        let wy1 = wall.y1;\n        let wy2 = wall.y2;\n\n        //find closest point on wall\n        let wallLen = Util.getPointDistance(wx1, wy1, wx2, wy2);\n        let dot = ( ((bx - wx1) * (wx2 - wx1)) + ((by - wy1) * (wy2 - wy1)) ) / Math.pow(wallLen, 2);\n        let closestX = wx1 + (dot * (wx2 - wx1));        \n        let closestY = wy1 + (dot * (wy2 - wy1));        \n\n        //make sure closest point is on the line\n        if (!wall.isPointCollide(closestX, closestY)) {\n          continue;\n        }\n\n        let distance = Util.getPointDistance(bx, by, closestX, closestY);\n\n        if (distance <= ball.radius) {                   \n          ball.collideEdge(wall);\n        }                \n      }\n    }\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://Billiards/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// const Ball = require(\"./ball.js\");\n// const Table = require(\"./table.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\nconst GameView = __webpack_require__(/*! ./game-view.js */ \"./src/game-view.js\")\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", event => {\n  const canvas = document.getElementById(\"table\");\n  const ctx = canvas.getContext('2d');\n  canvas.width = 1400;\n  canvas.height = 700; \n\n  let game = new Game(canvas, ctx);\n  let gameView = new GameView(game, ctx);\n  gameView.draw();\n  let cue = game.balls[0];\n  \n\n})\n\n\n//# sourceURL=webpack://Billiards/./src/index.js?");

/***/ }),

/***/ "./src/table.js":
/*!**********************!*\
  !*** ./src/table.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Wall = __webpack_require__(/*! ./wall.js */ \"./src/wall.js\");\nconst Ball = __webpack_require__ (/*! ./ball.js */ \"./src/ball.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass Table {\n  constructor (canvas, ctx) {\n    this.ctx = ctx;\n\n    this.balls = this.generateBalls();\n    this.positionBalls();\n\n    this.walls = this.generateWalls();\n    // this.positionWalls();\n\n    this.width = canvas.width;\n    this.height = canvas.height;\n\n    this.img = new Image();\n    this.img.src = \"../src/assets/images/table.png\"\n  }\n\n  generateBalls () {\n    const balls = [];\n    for(let i = 0; i <= 15; i++) {\n      let ball = new Ball(i);\n      balls.push(ball);\n    }    \n    return balls;\n  }\n\n  draw(ctx) {     \n    ctx.drawImage(this.img, 0, 0, this.width, this.height);   \n    this.balls.forEach( (ball) => { ball.draw(this.ctx) } );     \n  }\n\n  positionBalls () { \n    this.balls[0].pos = [1050, 325];\n\n    let x = 325;\n    let y = 325;\n    \n    this.balls[1].pos = [x, y];\n\n    this.balls[2].pos = [x - 26, y - 15];\n    this.balls[3].pos = [x - 26, y + 15];\n\n    this.balls[4].pos = [x - 52, y - 30];\n    this.balls[8].pos = [x - 52, y];\n    this.balls[5].pos = [x - 52, y + 30];\n\n    this.balls[6].pos = [x - 78, y + 15];\n    this.balls[7].pos = [x - 78, y + 45];   \n    this.balls[9].pos = [x - 78, y - 45];\n    this.balls[10].pos = [x - 78, y - 15];\n\n    this.balls[11].pos = [x - 104, y - 30];\n    this.balls[12].pos = [x - 104, y];\n    this.balls[13].pos = [x - 104, y + 30];\n    this.balls[14].pos = [x - 104, y + 60];\n    this.balls[15].pos = [x - 104, y - 60];\n  }\n\n  generateWalls() {\n    return [\n      new Wall(this.ctx, 127, 80, 650, 80, 'horizontal'), //top-left\n      new Wall(this.ctx, 735, 80, 1262, 80, 'horizontal'), //top-right\n      new Wall(this.ctx, 127, 620, 650, 620, 'horizontal'),//bottom-left\n      new Wall(this.ctx, 735, 620, 1262, 620, 'horizontal'), //bottom-right\n      new Wall(this.ctx, 90, 123, 90, 580, 'vertical'), //left\n      new Wall(this.ctx, 1310, 123, 1310, 580, 'vertical'), //right\n      //corners, clockwise starting from top-left\n      new Wall(this.ctx, 127, 80, 105, 60, '2-diag'),       \n      new Wall(this.ctx, 650, 80, 660, 60, '1-diag'),\n      new Wall(this.ctx, 735, 80, 727, 60, '2-diag'),\n      new Wall(this.ctx, 1262, 80, 1285, 60, '1-diag'),\n      new Wall(this.ctx, 1310, 123, 1340, 100, '1-diag'),\n      new Wall(this.ctx, 1310, 580, 1340, 605, '2-diag'),\n      new Wall(this.ctx, 1262, 620, 1290, 650, '2-diag'),\n      new Wall(this.ctx, 735, 620, 723, 650, '1-diag'),\n      new Wall(this.ctx, 650, 620, 660, 650, '2-diag'),\n      new Wall(this.ctx, 127, 620, 100, 650, '1-diag'),\n      new Wall(this.ctx, 90, 580, 60, 610, '1-diag'),\n      new Wall(this.ctx, 90, 123, 65, 100, '2-diag')\n    ];\n\n  }\n  \n}\n\nmodule.exports = Table;\n\n//# sourceURL=webpack://Billiards/./src/table.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  getDistance: function (b1, b2) {\n    let x1 = b1.pos[0];\n    let x2 = b2.pos[0];\n    let y1 = b1.pos[1];\n    let y2 = b2.pos[1];\n    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));\n  },\n  \n  getPointDistance: function (x1, y1, x2, y2) {\n    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));\n  }\n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack://Billiards/./src/util.js?");

/***/ }),

/***/ "./src/wall.js":
/*!*********************!*\
  !*** ./src/wall.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass Wall {\n  constructor(ctx, x1, y1, x2, y2, type) {\n    this.ctx = ctx;\n    this.color = \"red\";\n\n    this.x1 = x1;\n    this.x2 = x2;\n    this.y1 = y1;\n    this.y2 = y2;  \n\n    this.type = type;\n  }\n\n  draw(ctx) {\n    ctx.moveTo(this.x1, this.y1);\n    ctx.lineTo(this.x2, this.y2);\n    ctx.strokeStyle = this.color;\n    ctx.lineWidth = 3;\n    ctx.stroke();    \n  }\n\n  isPointCollide(x, y) {\n    let dist1 = Util.getPointDistance(this.x1, this.y1, x, y);\n    let dist2 = Util.getPointDistance(this.x2, this.y2, x, y);\n    let wallLength = Util.getPointDistance(this.x1, this.y1, this.x2, this.y2);\n\n    let buffer = 0.1;\n\n    if (dist1 + dist2 >= wallLength - buffer && dist1 + dist2 <= wallLength + buffer) {\n      return true;\n    }\n    return false;\n  }\n  \n}\n\nmodule.exports = Wall;\n\n//# sourceURL=webpack://Billiards/./src/wall.js?");

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