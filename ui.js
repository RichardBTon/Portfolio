// Kanskje noe over vinduet som viser at man kan bevege det
// Seksjoner med fargene til knappene i venstre del av vinduet

window.addEventListener("load", function () {
  // Flytt vindu
  let elements = document.getElementsByClassName("window");

  for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("mousedown", flyttInit);
  }

  // Endre tema
  let hrefs = ["purple.css", "blue.css", "green.css", "white.css"];
  let temaKnapper = document.getElementsByClassName("temadot");

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
  let sec1 = document.getElementById("sec-1");
  let element = event.currentTarget;
  // Sjekker om targetet er navbar, hvis ikke bryter den

  if (!event.target.classList.contains("navbar")) {
    return;
  }

  if (700 > sec1.offsetWidth) {
    return;
  }

  element.utgangsstillingMusX = event.x;
  element.utgangsstillingMusY = event.y;

  element.utgangsstillingLeft = element.offsetLeft;
  element.utgangsstillingTop = element.offsetTop;

  let flytt = flyttElm(element, sec1);
  document.body.addEventListener("mousemove", flytt);

  document.addEventListener("mouseup", function fjern() {
    document.body.removeEventListener("mousemove", flytt);
    document.body.removeEventListener("mouseup", fjern);
  });
}

function flyttElm(element, sec1) {
  return function flytt(event) {
    // Fjerner all default funksjon i eventet, i dette tilfellet mousedown
    event.preventDefault();

    let xDiff = element.utgangsstillingMusX - event.x;
    let yDiff = element.utgangsstillingMusY - event.y;

    diffs = borders(event, element, xDiff, yDiff, sec1);
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

function borders(event, element, xDiff, yDiff, sec1) {
  // Setter border Top
  if (element.utgangsstillingTop - yDiff < 0) {
    yDiff = element.utgangsstillingTop;
  }

  // Setter border høyre
  if (
    element.utgangsstillingLeft + element.offsetWidth - xDiff >
    sec1.offsetWidth
  ) {
    xDiff = -(
      sec1.offsetWidth -
      (element.utgangsstillingLeft + element.offsetWidth)
    );
  }

  // Setter border nede
  if (
    element.utgangsstillingTop + element.offsetHeight - yDiff >
    sec1.offsetHeight
  ) {
    yDiff = -(
      sec1.offsetHeight -
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
