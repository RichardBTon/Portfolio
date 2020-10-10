const snakeBox = document.querySelector("#snake-container");
const pixelsPerSquare = 50;
const snakePartClassCSS = "snake-part";

document.documentElement.style.setProperty(
  "--snakePartSize",
  `${pixelsPerSquare}px`
);

class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    const part = document.createElement("div");
    part.classList.add(snakePartClassCSS);
    snakeBox.appendChild(part);
    this.elm = part;

    this.move(this.x, this.y);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    let windowX = this.x * pixelsPerSquare;
    let windowY = this.y * pixelsPerSquare;
    this.elm.style.left = `${windowX}px`;
    this.elm.style.top = `${windowY}px`;
  }
}

class Head extends SnakePart {
  constructor(x, y, tailCoords) {
    super(x, y);
    this.elm.classList.add("snake-head");
    this.history = tailCoords;
  }
  moveHead(x, y) {
    const newHistory = this.history.slice();
    newHistory.unshift({ x: this.x, y: this.y });
    this.history = newHistory;
    this.move(x, y);
  }
}

class Snake {
  constructor(headX, headY, tailCoords) {
    let head = new Head(headX, headY, tailCoords);

    this.head = head;

    let tail = [];
    for (var i = 0; i < tailCoords.length; i++) {
      tail.push(new SnakePart(tailCoords[i].x, tailCoords[i].y));
    }
    this.tail = tail;

    this.vx = 0;
    this.vy = 0;

    this.moving = false;
  }
  move() {
    let x = this.head.x + this.vx;
    let y = this.head.y + this.vy;

    this.head.moveHead(x, y);
    for (var i = 0; i < this.tail.length; i++) {
      this.tail[i].move(this.head.history[i].x, this.head.history[i].y);
    }
  }
  start() {
    if (this.moving) return;
    console.log("starter");
    this.moving = true;
    let move = () => this.move();
    this.gameLoop = setInterval(move, 200);
  }
  stop() {
    if (!this.moving) return;
    console.log("stopper");
    this.moving = false;
    clearInterval(this.gameLoop);
  }
}

let tailCoords = [
  {
    x: 4,
    y: 5,
  },
  {
    x: 3,
    y: 5,
  },
  {
    x: 2,
    y: 5,
  },
];

const snake = new Snake(5, 5, tailCoords);

// let tail = [];
// for (var i = 0; i < head.history.length; i++) {
//   tailPart = new SnakePart(head.x - (i + 1), head.y);
//   tail.push(tailPart);
// }

// const head = new Head(5, 5, tailCoords);

// function moveSnake() {
//   head.moveHead(6, 5);
//   // console.log(head.history);
//   for (var i = 0; i < tail.length; i++) {
//     // console.log(tail[i].x, tail[i].y);
//     tail[i].move(head.history[i].x, head.history[i].y);
//   }
// }
//
// moveSnake();

// Actually moving with keys
window.addEventListener("keydown", keyMove);
function keyMove(e) {
  arrowMove(e);
  if (![32].includes(e.keyCode)) return;
  e.preventDefault();
  if (e.keyCode === 32) {
    snake.moving ? snake.stop() : snake.start();
  }
}

function arrowMove(e) {
  if (![37, 38, 39, 40].includes(e.keyCode)) return;
  if (e.keyCode === 37) {
    // left
    snake.vx = -1;
    snake.vy = 0;
  } else if (e.keyCode === 38) {
    // up
    snake.vx = 0;
    snake.vy = -1;
  } else if (e.keyCode === 39) {
    // right
    snake.vx = 1;
    snake.vy = 0;
  } else if (e.keyCode === 40) {
    // down
    snake.vx = 0;
    snake.vy = 1;
  }
  if (!snake.moving) {
    snake.start();
  }
}
