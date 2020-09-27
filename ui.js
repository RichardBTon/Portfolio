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

  // Set tema hvis lagret
  if (localStorage.getItem("tema") != undefined) {
    document.getElementById("tema_css").href = localStorage.getItem("tema");
  }

  // Legg til riktig tema til riktige temaknapper
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

  // Pass på at seksjonen der du vil at skal kunne bevege seg er parentElement til event.currentTarget
  let sec = event.currentTarget.parentElement;
  // debugger;
  // flytter ikke hvis vinduet er
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
    document.body.removeEventListener("mousemove", flytt);
    document.body.removeEventListener("mouseup", fjern);
  });
}

function flyttElmMus(element, sec) {
  return function (event) {
    // Fjerner all default funksjon i eventet, i dette tilfellet mousedown
    event.preventDefault();

    let xDiff = element.utgangsstillingMusX - event.x;
    let yDiff = element.utgangsstillingMusY - event.y;

    diffs = borders(element, sec, xDiff, yDiff);
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
  // console.log(element, "hei");
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
  let element = vindu[0];

  // console.log(element);
  let sec2 = document.getElementById("sec-1");
  // // Venstre
  // if (element.offsetLeft < 0) {
  //   xDiff1 = element.utgangsstillingLeft;
  // }
  // // Høyre
  // if (element.offsetLeft + element.offsetWidth > sec2.offsetWidth) {
  //   xDiff1 = -(sec2.offsetWidth - (element.offsetLeft + element.offsetWidth));
  // }
  // element.style.left = element.offsetLeft - xDiff1 + "px";
  xDiff = borders(element, sec2)[0];

  flyttElm(element, element.offsetLeft - xDiff, element.offsetTop);
}

function flyttElm(element, left, top) {
  // Elementet må ha position: absolute;
  element.style.left = left + "px";
  element.style.top = top + "px";
}
// Ønsker å ha en flyttfunksjon som ikke bare funker for sec-1.
// Ønsker borders som flytter elementet automatisk? Så slipper jeg å lage en
// egen resizefunk.
