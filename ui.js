// Kanskje noe over vinduet som viser at man kan bevege det
// Seksjoner med fargene til knappene i venstre del av vinduet

window.addEventListener("load", function () {
  // Flytt vindu
  let elements = document.getElementsByClassName("window");

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", flyttInit);
  }
  window.addEventListener("resize", resizefunk);

  // Endre tema
  const hrefs = ["purple.css", "blue.css", "green.css", "white.css"];
  const temaKnapper = document.getElementsByClassName("temadot");

  if (localStorage.getItem("tema") != undefined) {
    document.getElementById("tema_css").href = localStorage.getItem("tema");
  }

  for (var i = 0; i < temaKnapper.length; i++) {
    let setTema1 = setTema(hrefs, temaKnapper, i);
    temaKnapper[i].addEventListener("click", setTema1);
  }

  // Scrollknapper
  let secDotter = Array.from(document.getElementsByClassName("dot"));
  let sections = Array.from(document.getElementsByClassName("sec"));

  for (var i = 0; i < secDotter.length; i++) {
    let addScrollFunc1 = ScrollFunc(sections, secDotter, i);
    secDotter[i].addEventListener("click", addScrollFunc1);
  }

  document
    .getElementById("kontakt-btn")
    .addEventListener("click", function (event) {
      event.preventDefault();
      document.getElementById("kontakt").scrollIntoView();
    });
});

function setTema(hrefs, temaKnapper, i) {
  return function () {
    temaPath = "css/" + hrefs[i];
    document.getElementById("tema_css").href = temaPath;
    localStorage.setItem("tema", temaPath);
  };
}

function flyttInit(event) {
  // Sjekker om targetet er navbar, hvis ikke bryter den

  if (!event.target.classList.contains("navbar")) {
    return;
  }
  let sec = document.getElementById("sec-1");

  // flytter ikke hvis vinduet er
  if (700 > sec.offsetWidth) {
    return;
  }

  let element = event.currentTarget;
  element.utgangsstillingMusX = event.x;
  element.utgangsstillingMusY = event.y;

  element.utgangsstillingLeft = element.offsetLeft;
  element.utgangsstillingTop = element.offsetTop;

  let flytt = flyttElm(element, sec);
  document.body.addEventListener("mousemove", flytt);

  document.addEventListener("mouseup", function fjern() {
    document.body.removeEventListener("mousemove", flytt);
    document.body.removeEventListener("mouseup", fjern);
  });
}

function flyttElm(element, sec) {
  return function flytt(event) {
    // Fjerner all default funksjon i eventet, i dette tilfellet mousedown
    event.preventDefault();

    let xDiff = element.utgangsstillingMusX - event.x;
    let yDiff = element.utgangsstillingMusY - event.y;

    diffs = borders(element, xDiff, yDiff, sec);
    xDiff = diffs[0];
    yDiff = diffs[1];

    let nyUtgangsstillingLeft = element.utgangsstillingLeft - xDiff;
    let nyUtgangsstillingTop = element.utgangsstillingTop - yDiff;

    element.style.left = nyUtgangsstillingLeft + "px";
    element.style.top = nyUtgangsstillingTop + "px";

    element.utgangsstillingLeft = nyUtgangsstillingLeft;
    element.utgangsstillingTop = nyUtgangsstillingTop;

    element.utgangsstillingMusX = event.x;
    element.utgangsstillingMusY = event.y;
  };
}

function borders(element, xDiff, yDiff, sec) {
  // Setter border Top
  if (element.utgangsstillingTop - yDiff < 0) {
    yDiff = element.utgangsstillingTop;
  }

  // Setter border høyre
  if (
    element.utgangsstillingLeft + element.offsetWidth - xDiff >
    sec.offsetWidth
  ) {
    xDiff = -(
      sec.offsetWidth -
      (element.utgangsstillingLeft + element.offsetWidth)
    );
  }

  // Setter border nede
  if (
    element.utgangsstillingTop + element.offsetHeight - yDiff >
    sec.offsetHeight
  ) {
    yDiff = -(
      sec.offsetHeight -
      (element.utgangsstillingTop + element.offsetHeight)
    );
  }

  // Setter border venstre
  if (element.utgangsstillingLeft - xDiff < 0) {
    xDiff = element.utgangsstillingLeft;
  }
  return [xDiff, yDiff];
}

function ScrollFunc(sections, secDotter, k) {
  return function () {
    let sectionsOver = sections.slice(0, k + 1);
    let totalHeight = 0;

    for (var i = 0; i < sectionsOver.length; i++) {
      totalHeight += sectionsOver[i].offsetHeight;
    }

    window.scrollTo(0, totalHeight);
  };
}

function resizefunk() {
  let vindu = document.getElementsByClassName("window");
  let element1 = vindu[0];
  let sec2 = document.getElementById("sec-1");
  let xDiff1 = 0;
  // Venstre
  if (element1.offsetLeft < 0) {
    xDiff1 = element1.utgangsstillingLeft;
  }
  // Høyre
  if (element1.offsetLeft + element1.offsetWidth > sec2.offsetWidth) {
    xDiff1 = -(sec2.offsetWidth - (element1.offsetLeft + element1.offsetWidth));
  }
  element1.style.left = element1.offsetLeft - xDiff1 + "px";
}

// Ønsker å ha en flyttfunksjon som ikke bare funker for sec-1.
// Ønsker borders som flytter elementet automatisk? Så slipper jeg å lage en
// egen resizefunk.
