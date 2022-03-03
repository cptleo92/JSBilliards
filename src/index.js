// const Ball = require("./ball.js");
// const Table = require("./table.js");
const Util = require("./util.js");
const GameView = require("./game-view.js")
const Game = require("./game.js")

document.addEventListener("DOMContentLoaded", event => {
  const canvas = document.getElementById("table");
  const ctx = canvas.getContext('2d');
  canvas.width = 1400;
  canvas.height = 700; 

  let game = new Game(canvas, ctx);
  let gameView = new GameView(game, ctx);
  gameView.draw();
  let cue = game.balls[0];
  

})
