const snakeBox = document.querySelector("#snake-container");
const pixelsPerSquare = 20;
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
    let windowX = x * pixelsPerSquare;
    let windowY = y * pixelsPerSquare;
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

const head = new Head(5, 5, tailCoords);

let tail = [];
for (var i = 0; i < head.history.length; i++) {
  tailPart = new SnakePart(head.x - (i + 1), head.y);
  tail.push(tailPart);
}

function moveSnake() {
  head.moveHead(6, 5);
  // console.log(head.history);
  for (var i = 0; i < tail.length; i++) {
    // console.log(tail[i].x, tail[i].y);
    tail[i].move(head.history[i].x, head.history[i].y);
  }
}

moveSnake();
