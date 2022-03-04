// const Ball = require("./ball.js");
// const Table = require("./table.js");
const Util = require("./util.js");
const GameView = require("./game-view.js")
const Game = require("./game.js")

document.addEventListener("DOMContentLoaded", event => {
  const canvas = document.getElementById("table");
  const ctx = canvas.getContext('2d');
  canvas.width = 1200;
  canvas.height = 600; 

  let game = new Game(canvas, ctx);
  let gameView = new GameView(game, ctx);
 
  document.addEventListener("click", e => {
    console.log(Util.getCursorPos(e));
  })
})
