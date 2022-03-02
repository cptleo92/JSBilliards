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

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nconst RADIUS = 15;\nconst COLORS = [\"yellow\", \"blue\", \"red\", \"purple\", \"orange\", \"green\", \"maroon\"]\n\nclass Ball {\n  constructor (num, pos, vel = [0,0]) {\n    this.num = num;\n    this.color = this.getColor(num);\n    this.type = this.getType(num);\n    this.radius = RADIUS;\n    this.pos = pos;\n    this.vel = vel;\n\n  }\n  \n  getColor(num) {\n    if (num < 8 && num !== 0) {\n      return COLORS[num - 1];\n    } else if (num > 8) {\n      return COLORS[num - 9];\n    } else if (num === 8) {\n      return \"black\";\n    } else {\n      return \"white\";\n    }\n  }\n\n  getType(num) {\n    if (num < 8) {\n      return \"solid\";\n    } else if (num > 8) {\n      return \"stripe\";\n    }\n  }\n\n  draw(ctx) {    \n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2);\n\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.stroke();\n\n    ctx.beginPath();\n    ctx.font = '12px sans serif'\n    ctx.fillStyle = \"black\";\n    ctx.fillText(this.num, this.pos[0], this.pos[1] + 4);     \n    ctx.textAlign = \"center\";\n  }\n\n  move(timeDelta) {\n    const velScale = timeDelta / (1000 / 60);\n    let x = this.pos[0];\n    let y = this.pos[1];\n    let dx = this.vel[0] * velScale;\n    let dy = this.vel[1] * velScale;\n\n    this.pos = [x + dx, y + dy];\n    this.collideEdge();\n    \n    if (dx !== 0) {\n      Math.abs(dx) < .1 ? this.vel[0] = 0 : this.vel[0] *= .99;\n    }\n\n    if (dy !== 0) {\n      Math.abs(dy) < .1 ? this.vel[1] = 0 : this.vel[1] *= .99;\n    }\n  }\n\n  collideEdge() {\n    let x = this.pos[0];\n    let y = this.pos[1];\n\n    if (x < 15) {\n      this.pos[0] = 15;\n      this.vel[0] *= -1;      \n    }\n\n    if (x > 1185) {\n      this.pos[0] = 1185;\n      this.vel[0] *= -1;    \n    }\n\n    if (y < 15) {\n      this.pos[1] = 15;\n      this.vel[1] *= -1;      \n    }\n\n    if (y > 585) {\n      this.pos[1] = 585;\n      this.vel[1] *= -1;\n    }\n  }  \n}\n\nmodule.exports = Ball;\n\n//# sourceURL=webpack://Billiards/./src/ball.js?");

/***/ }),

/***/ "./src/game-view.js":
/*!**************************!*\
  !*** ./src/game-view.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\nclass GameView {\n  constructor(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n    this.lastTime = 0;\n\n    window.requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    const timeDelta = time - this.lastTime;\n\n    this.game.moveBalls(timeDelta);\n    this.game.detectCollisions();\n    this.draw();\n    this.lastTime = time;\n    window.requestAnimationFrame(this.animate.bind(this));\n  }    \n\n  draw () {\n    this.ctx.clearRect(0, 0, 1200, 600); \n\n    this.ctx.beginPath();\n    this.ctx.moveTo(900, 0);\n    this.ctx.lineTo(900, 600);\n    this.ctx.stroke();\n\n    this.game.table.balls.forEach( (ball) => { ball.draw(this.ctx) } )   \n  }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack://Billiards/./src/game-view.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Table = __webpack_require__(/*! ./table.js */ \"./src/table.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\n// const Ball= require(\"./ball.js\");\n\nclass Game {\n  constructor (canvas) {\n    this.table = new Table(canvas);\n    this.balls = this.table.balls;\n    this.cue = this.table.balls[0];\n  }\n\n\n  hitCue(vel) {\n    this.cue.vel = vel;\n\n  }\n\n  moveBalls(timeDelta) {\n    this.balls.forEach( ball1 => {\n      ball1.move(timeDelta);        \n    })\n  }\n\n  detectCollisions() {\n    // this whole section was taken from spicyyoghurt.com's tutorial on collision detection physics\n    \n    let obj1;\n    let obj2;    \n    \n    for (let i = 0; i < this.balls.length; i++) {\n        obj1 = this.balls[i];        \n        for (let j = i + 1; j < this.balls.length; j++)\n        {\n            obj2 = this.balls[j];\n\n            if (Util.getDistance(obj1, obj2) <= 31) {    \n              let vCollision = {x: obj2.pos[0] - obj1.pos[0], y: obj2.pos[1] - obj1.pos[1]};\n              let distance = Math.sqrt((obj2.pos[0]-obj1.pos[0])*(obj2.pos[0]-obj1.pos[0]) + (obj2.pos[1]-obj1.pos[1])*(obj2.pos[1]-obj1.pos[1]));\n              let vCollisionNorm = {x: vCollision.x / distance, y: vCollision.y / distance};\n              let vRelativeVelocity = {x: obj1.vel[0] - obj2.vel[0], y: obj1.vel[1] - obj2.vel[1]};\n              let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;\n\n              if (speed < 0) {\n                  break;\n              }\n        \n              obj1.vel[0] -= (speed * vCollisionNorm.x);\n              obj1.vel[1] -= (speed * vCollisionNorm.y);\n              obj2.vel[0] += (speed * vCollisionNorm.x);\n              obj2.vel[1] += (speed * vCollisionNorm.y);\n          }\n        }\n    }\n  }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://Billiards/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("// const Ball = require(\"./ball.js\");\n// const Table = require(\"./table.js\");\nconst GameView = __webpack_require__(/*! ./game-view.js */ \"./src/game-view.js\")\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\")\n\ndocument.addEventListener(\"DOMContentLoaded\", event => {\n  const canvas = document.getElementById(\"table\");\n  const ctx = canvas.getContext('2d');\n\n  let game = new Game(canvas);\n  let gameView = new GameView(game, ctx);\n  gameView.draw();\n\n  canvas.addEventListener(\"click\", e => {\n    game.hitCue([-30, 0]);\n  });\n\n})\n\n\n//# sourceURL=webpack://Billiards/./src/index.js?");

/***/ }),

/***/ "./src/table.js":
/*!**********************!*\
  !*** ./src/table.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ball = __webpack_require__ (/*! ./ball.js */ \"./src/ball.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\nclass Table {\n  constructor (canvas) {\n    this.balls = this.generateBalls();\n    this.positionBalls();\n\n    this.width = canvas.width;\n    this.height = canvas.height;\n  }\n\n  generateBalls () {\n    const balls = [];\n    for(let i = 0; i <= 15; i++) {\n      let ball = new Ball(i);\n      balls.push(ball);\n    }    \n    return balls;\n  }\n\n  positionBalls () { \n    this.balls[0].pos = [900, 300];\n\n    this.balls[1].pos = [300, 300];\n\n    this.balls[2].pos = [274, 285];\n    this.balls[3].pos = [274, 315];\n\n    this.balls[4].pos = [248, 270];\n    this.balls[8].pos = [248, 300];\n    this.balls[5].pos = [248, 330];\n\n    this.balls[6].pos = [222, 315];\n    this.balls[7].pos = [222, 345];   \n    this.balls[9].pos = [222, 255];\n    this.balls[10].pos = [222, 285];\n\n    this.balls[11].pos = [196, 270];\n    this.balls[12].pos = [196, 300];\n    this.balls[13].pos = [196, 330];\n    this.balls[14].pos = [196, 360];\n    this.balls[15].pos = [196, 240];\n  }\n  \n}\n\nmodule.exports = Table;\n\n//# sourceURL=webpack://Billiards/./src/table.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((module) => {

eval("const Util = {\n  getDistance: function (b1, b2) {\n    let x1 = b1.pos[0];\n    let x2 = b2.pos[0];\n    let y1 = b1.pos[1];\n    let y2 = b2.pos[1];\n    return Math.sqrt(((x1 - x2) ** 2) + ((y1 - y2) ** 2));\n  },\n  \n}\n\nmodule.exports = Util;\n\n//# sourceURL=webpack://Billiards/./src/util.js?");

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