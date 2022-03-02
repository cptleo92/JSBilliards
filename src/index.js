// const Ball = require("./ball.js");
// const Table = require("./table.js");
const GameView = require("./game-view.js")
const Game = require("./game.js")

document.addEventListener("DOMContentLoaded", event => {
  const canvas = document.getElementById("table");
  const ctx = canvas.getContext('2d');

  let game = new Game(canvas);
  let gameView = new GameView(game, ctx);
  gameView.draw();

  canvas.addEventListener("click", e => {
    game.hitCue([-30, 0]);
  });

})
