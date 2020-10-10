const snakeBox = document.querySelector("#snake-container");
const pixelsPerSquare = 20;
const snakePartClassCSS = "snake-part"
document.documentElement.style.setProperty("--snakePartSize", `${pixelsPerSquare}px`)

class SnakePart {

  constructor(x, y) {
    this.x = x;
    this.y = y;

    const part = document.createElement("div");
    part.classList.add(snakePartClassCSS);
    snakeBox.appendChild(part);
    this.elm = part;

    this.move(this.x, this.y)
  }

  move(x, y){
    this.x = x;
    this.y = y;
    let windowX = x * pixelsPerSquare
    let windowY = y * pixelsPerSquare
    this.elm.style.left = `${windowX}px`;
    this.elm.style.top = `${windowY}px`;
  }
}

class Head extends SnakePart{
  constructor(x, y) {
    super(x, y)
  }
}

const head = new Head(5, 5)
