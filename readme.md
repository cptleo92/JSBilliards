# JS-Billiards (name pending)

Until I come up with a better name, JS-Billiards is a browser implementation of pool written in Javascript. JS-Billiards includes the standard 8-ball and 9-ball variations of pool, but will also include a couple of fun game modes: Pool with Powers and Chaos Pool. 

Fun fact: the names *billiards* and *pool* are generally used interchangeably these days, but they in fact refer to different variations of the table game, much like snooker is a completely different game. I believe this game is technically called pocket billiards.

<b>Pool with Powers</b> will randomly assign you a power that you can use at any time. These include:
- <i>Teleport Ball</i>: the first ball that the cue ball comes into contact with will be removed and placed at a random location on the table. The cue ball will continue moving as if the ball was never there. 
- <i>Blunt Tip</i>: on your opponent's next shot, their spin will be completely random. 
- <i>Free Scratch</i>: you are allowed a scratch on this turn. But if the cue ball ends up in a pocket, your opponent gets ball in hand anyway. 
- And many more! 

<b>Chaos Pool</b> will only allow you to select direction. Power and spin will be randomized. 

### Timeline
##### Day 1
I used canvas to set up a very simple table with balls just to get the physics down. I followed [this tutorial](https://spicyyoghurt.com/tutorials/html5-javascript-game-development/collision-detection-physics) to get the ball rolling (ha!). 
