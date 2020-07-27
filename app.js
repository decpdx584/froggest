let movementDisplay;
let ctx;
let game;
let froggo;
let log;
// Crawler Constructor function
function Crawler(x, y, width, height, color) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.alive = true;
  this.render = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const detectHit = () => {
    // check for collision on x axis
    if (froggo.x + froggo.width > log.x &&
        froggo.x < log.x + log.width &&
        froggo.y + froggo.height > log.y &&
        froggo.y < log.y + log.height) {
            log.alive = false;
    }
}
const gameLoop = () => {
  // clear the cavas
  ctx.clearRect(0, 0, game.width, game.height);
  // display the x, y coordinates of our hero onto the DOM
  movementDisplay.textContent = `X:${froggo.x}\nY:${froggo.y}`;
  // check if the ogre is alive and 
  if (log.alive) {
    // render the ogre
    log.render()
    // check for collision
    detectHit();
    // TODO detectHit()
  }
  // render the hero
  froggo.render()
}
const movementHandler = e => {
  // w: 87, a:65, s:83, d:68
  // up: 38, left: 37, down: 40, right: 39
  switch (e.keyCode) {
    case (87): // w up
      if (froggo.y > 0) froggo.y -=40
      break;
    case (38): // ⬆️ up
      if (froggo.y > 0) froggo.y -=40
      break;
    case (83): // s down
      if (froggo.y + froggo.height < game.height) froggo.y +=40
      break;
    case (40): // ⬇️ down
      if (froggo.y + froggo.height < game.height) froggo.y +=40
      break;
    case (65): // a left
      if (froggo.x > 0) froggo.x -=40
      break;
    case (37): // ⬅️ left
      if (froggo.x > 0) froggo.x -=40
      break;
    case (68): // d right
      if (froggo.x + froggo.width < game.width) froggo.x +=40
      break;
    case (39): // ▶️ right
      if (froggo.x + froggo.width < game.width) froggo.x +=40
      break;
    default:
      console.log('invalid keystroke');
  }
}
document.addEventListener('DOMContentLoaded', () => {
  console.log('Dom loaded')
  // DOM REFS
  movementDisplay = document.getElementById('movement');
  game = document.getElementById('game');
  // CANVAS CONFIG
  game.setAttribute('height', 640);
  game.setAttribute('width', 450);
  ctx = game.getContext('2d');
  // CHARACTER REFS
  log = new Crawler(100, 300, 80, 20, 'tan');
  froggo = new Crawler(200, 610, 40, 40, 'blueViolet');
  document.addEventListener('keydown', movementHandler);
  let runGame = setInterval(gameLoop, 60);
})