// ==============================================================
// Main funksjon
// Kanskje noe over vinduet som viser at man kan bevege det

window.addEventListener("load", function () {
  // Flytting av vindu
  let vinduer = document.getElementsByClassName("window");

  for (var i = 0; i < vinduer.length; i++) {
    vinduer[i].addEventListener("mousedown", flyttInit);
  }

  window.addEventListener("resize", resizeBorders);

  // Endring av tema
  const hrefs = ["purple.css", "blue.css", "green.css", "white.css"];
  const temaKnapper = document.getElementsByClassName("temadot");

  // Set tema hvis lagret
  if (localStorage.getItem("tema") != undefined) {
    document.getElementById("tema_css").href = localStorage.getItem("tema");
  }

  // Legg til riktig tema til riktige temaknapper
  for (var i = 0; i < temaKnapper.length; i++) {
    let setTema1 = setTema(hrefs, temaKnapper, i);
    temaKnapper[i].addEventListener("click", setTema1);
  }

  // Flytt vindu
  // let vinduer = document.getElementsByClassName("window");

  for (var i = 0; i < vinduer.length; i++) {
    vinduer[i].addEventListener("mousedown", flyttInit);
  }

  window.addEventListener("resize", resizeBorders);
  window.addEventListener("resize", () => {
    // console.log(snake);
    pxPerSquare = document.querySelector(".snake-container").offsetWidth / 8;
    snake.updateBorders(pxPerSquare);
  });

  // Scrollknapper
  let secDotter = Array.from(document.getElementsByClassName("dot"));
  let sections = Array.from(document.getElementsByClassName("sec"));

  let addScrollFunc1;
  for (var i = 0; i < secDotter.length; i++) {
    addScrollFunc1 = ScrollFunc(sections, i);
    secDotter[i].addEventListener("click", addScrollFunc1);
  }

  // Kontaktscroll
  document.getElementById("kontakt-btn").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("kontakt").scrollIntoView();
  });
  //scroll to top

  document.querySelector("#to-top-btn").addEventListener("click", () => {
    console.log("hei");
    scrollTo(0, 0);
  });
});

// ==============================================================
// Funksjoner

function setTema(hrefs, temaKnapper, i) {
  return function () {
    let temaPath = "css/" + hrefs[i];
    document.getElementById("tema_css").href = temaPath;
    localStorage.setItem("tema", temaPath);
  };
}

function ScrollFunc(sections, k) {
  return function () {
    // DETTE ER OGSÅ MULIG:
    // let sectionsOver = sections.slice(0, k + 1);
    // let totalHeight = 0;
    //
    // for (var i = 0; i < sectionsOver.length; i++) {
    //   totalHeight += sectionsOver[i].offsetHeight;
    // }
    // window.scrollTo(0, totalHeight);
    sections[k + 1].scrollIntoView();
  };
}

// ==============================================================
// Flytt vindu

function flyttElm(element, left, top) {
  // Elementet må ha position: absolute;
  element.style.left = left + "px";
  element.style.top = top + "px";
}

function flyttInit(event) {
  // Sjekker om targetet er navbar, hvis ikke bryter den
  if (!event.target.classList.contains("navbar")) {
    return;
  }
  event.currentTarget.style.transitionDuration = "0s";
  // Pass på at seksjonen der du vil at skal kunne bevege seg er parentElement til event.currentTarget
  let sec = event.currentTarget.parentElement;

  if (700 > sec.offsetWidth) {
    return;
  }

  let element = event.currentTarget;
  element.utgangsstillingMusX = event.x;
  element.utgangsstillingMusY = event.y;

  element.utgangsstillingLeft = element.offsetLeft;
  element.utgangsstillingTop = element.offsetTop;

  let flytt = flyttElmMus(element, sec);
  document.body.addEventListener("mousemove", flytt);

  document.addEventListener("mouseup", function fjern() {
    element.style.transitionDuration = "inherit";
    document.body.removeEventListener("mousemove", flytt);
    document.body.removeEventListener("mouseup", fjern);
  });
}

function flyttElmMus(element, sec) {
  return function (event) {
    event.preventDefault();

    let xDiff = element.utgangsstillingMusX - event.x;
    let yDiff = element.utgangsstillingMusY - event.y;

    let diffs = borders(element, sec, xDiff, yDiff);
    xDiff = diffs[0];
    yDiff = diffs[1];

    let nyUtgangsstillingLeft = element.utgangsstillingLeft - xDiff;
    let nyUtgangsstillingTop = element.utgangsstillingTop - yDiff;

    flyttElm(element, nyUtgangsstillingLeft, nyUtgangsstillingTop);

    element.utgangsstillingLeft = nyUtgangsstillingLeft;
    element.utgangsstillingTop = nyUtgangsstillingTop;

    element.utgangsstillingMusX = event.x;
    element.utgangsstillingMusY = event.y;
  };
}

function borders(element, sec, xDiff = 0, yDiff = 0) {
  // Setter border Top
  if (element.offsetTop - yDiff < 0) {
    yDiff = element.offsetTop;
  }

  // Setter border høyre
  if (element.offsetLeft + element.offsetWidth - xDiff > sec.offsetWidth) {
    xDiff = -(sec.offsetWidth - (element.offsetLeft + element.offsetWidth));
  }

  // Setter border nede
  if (element.offsetTop + element.offsetHeight - yDiff > sec.offsetHeight) {
    yDiff = -(sec.offsetHeight - (element.offsetTop + element.offsetHeight));
  }

  // Setter border venstre
  if (element.offsetLeft - xDiff < 0) {
    xDiff = element.offsetLeft;
  }
  return [xDiff, yDiff];
}

function resizeBorders() {
  let vinduer = document.getElementsByClassName("window");
  let element;
  let sec;
  let xDiff;

  for (var i = 0; i < vinduer.length; i++) {
    element = vinduer[i];
    sec = element.parentElement;
    xDiff = borders(element, sec)[0];
    flyttElm(element, element.offsetLeft - xDiff, element.offsetTop);
  }
}

// ==============================================================
