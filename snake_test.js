const snakeBox = document.querySelector("#snake-container");
const pixelsPerSquare = 20;
class snakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function makeSnakePart(x, y) {
  console.log(x, y);
  const part = document.createElement("div");
  part.classList.add("snake-part");

  snakeBox.appendChild(part);
  part.style.left = `${x}px`;
  part.style.top = `${y}px`;
}

// document.getElementById("hei").style.left = "100px";
makeSnakePart(100, 100);
