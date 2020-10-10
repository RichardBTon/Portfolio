const snakeBox = document.querySelector("#snake-container");
const pxPerSquare = 50;
const snakePartClassCSS = "snake-part";

document.documentElement.style.setProperty(
  "--snakePartSize",
  `${pxPerSquare}px`
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
    let windowX = this.x * pxPerSquare;
    let windowY = this.y * pxPerSquare;
    this.elm.style.left = `${windowX}px`;
    this.elm.style.top = `${windowY}px`;
  }
}

class Head extends SnakePart {
  constructor(x, y, tailCoords) {
    super(x, y);
    this.elm.classList.add("snake-head");
    this.elm.classList.remove(snakePartClassCSS);
    this.history = tailCoords;
  }
  moveHead(x, y) {
    const newHistory = this.history.slice();
    newHistory.unshift({ x: this.x, y: this.y });
    this.history = newHistory;
    this.move(x, y);
  }
  rotateHead() {}
}

class Snake {
  constructor(headX, headY, tailCoords, container) {
    this.container = container;
    this.containerWidth = Math.floor(container.offsetWidth / pxPerSquare);
    this.containerHeight = Math.floor(container.offsetHeight / pxPerSquare);

    let head = new Head(headX, headY, tailCoords);
    this.head = head;

    let tail = [];
    for (var i = 0; i < tailCoords.length; i++) {
      tail.push(new SnakePart(tailCoords[i].x, tailCoords[i].y));
    }
    this.tail = tail;

    this.vx = -1;
    this.vy = 0;

    this.moving = false;
  }
  move() {
    this.start();
    let x = this.head.x + this.vx;
    let y = this.head.y + this.vy;
    [x, y] = this.applyBorders(x, y);

    this.head.moveHead(x, y);
    for (var i = 0; i < this.tail.length; i++) {
      this.tail[i].move(this.head.history[i].x, this.head.history[i].y);
    }
  }

  moveLeft() {
    if (this.vx === 1) return;
    this.vx = -1;
    this.vy = 0;
  }
  moveRight() {
    if (this.vx === -1) return;
    this.vx = 1;
    this.vy = 0;
  }
  moveUp() {
    if (this.vy === 1) return;
    this.vx = 0;
    this.vy = -1;
  }
  moveDown() {
    if (this.vy === -1) return;
    this.vx = 0;
    this.vy = 1;
  }

  start() {
    if (this.moving) return;
    // console.log("starter");
    this.moving = true;
    let move = () => this.move();
    this.gameLoop = setInterval(move, 200);
  }
  stop() {
    if (!this.moving) return;
    // console.log("stopper");
    this.moving = false;
    clearInterval(this.gameLoop);
  }
  applyBorders(x, y) {
    // top border
    if (y < 0) {
      y = this.containerHeight - 1;
    }
    // right border
    if (x > this.containerWidth - 1) {
      x = 0;
    }
    // bottom border
    if (y > this.containerHeight - 1) {
      y = 0;
    }
    // left border
    if (x < 0) {
      x = this.containerWidth - 1;
    }
    return [x, y];
  }
}

let tailCoords = [
  {
    x: 6,
    y: 5,
  },
  {
    x: 7,
    y: 5,
  },
  {
    x: 8,
    y: 5,
  },
];

let snake = new Snake(5, 5, tailCoords, snakeBox);
console.log(snake.containerWidth);
console.log(snake.container.offsetWidth);
// Actually moving with keys
window.addEventListener("resize", function () {
  snake = new Snake(5, 5, tailCoords, snakeBox);
});
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
  e.preventDefault();
  if (e.keyCode === 37) {
    // left
    snake.moveLeft();
  } else if (e.keyCode === 38) {
    // up
    snake.moveUp();
  } else if (e.keyCode === 39) {
    // right
    snake.moveRight();
  } else if (e.keyCode === 40) {
    // down
    snake.moveDown();
  }
  if (!snake.moving) {
    snake.start();
  }
}

function setBorders() {}
