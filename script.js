// Zugriff auf die Popups nach dem Laden der Daten
let popups = document.getElementsByClassName("popup");

async function togglePopup(num) {
  popups[num].classList.toggle("active");
}

async function holeDaten(url) {
  try {
    let data = await fetch(url);
    return await data.json();
  }
  catch (error) {
    console.error(error);
  }
}

async function getDataAndColorize() {
  try {
    let parkingData = await holeDaten("https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20");



    for (let i = 0; i < parkingData.results.length; i++) {
      let parkingLot = parkingData.results[i];
      let occupancy = parkingLot.auslastung_prozent;
      let knopfColor = getColorFromOccupancy(occupancy);

      // Überprüfe, ob das .dot-Element existiert, bevor du darauf zugreifst
      let dot = document.querySelectorAll(".dot")[i];
      if (dot) {
        dot.style.backgroundColor = knopfColor;
        console.log("Farbe für Parkhaus " + parkingLot.name + ": " + knopfColor);
      }

      console.log(occupancy); // Ausgabe: Auslastung des Parkhauses
    }

    // Eventlistener für Popup-Buttons einrichten
    let closeBtns = document.getElementsByClassName("close-btn");
    let openBtns = document.getElementsByClassName("btn");

    for (let i = 0; i < closeBtns.length; i++) {
      closeBtns[i].addEventListener("click", function () { togglePopup(i) });
      openBtns[i].addEventListener("click", function () { togglePopup(i) });
    }
  } catch (error) {
    console.error(error);
  }
}

getDataAndColorize(); // Funktion aufrufen, um Daten abzurufen und die Knöpfe zu färben

function getColorFromOccupancy(occupancy) {
  if (occupancy >= 80) {
    return "red"; // Rot bei hoher Auslastung
  } else if (occupancy === null) {
    return "grey "; // Gelb bei mittlerer Auslastung
  } else if (occupancy >= 60) {
    return "orange"; // Orange bei mittlerer Auslastung
  } else {
    return "green"; // Grün bei niedriger Auslastung
  }
}

getColorFromOccupancy(); // Funktion aufrufen, um die Farbe des Knopfes zu bestimmen

// H2 Titel bewegen

const title = document.querySelector('.moving-title');
let position = 0;
const screenWidth = window.innerWidth;

function moveTitle() {
    position += 2; // Adjust speed as needed
    if (position > screenWidth) {
        position = -title.offsetWidth;
    }
    title.style.transform = `translateX(${position}px)`;

    requestAnimationFrame(moveTitle);
}

moveTitle();

