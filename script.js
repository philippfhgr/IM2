// Zugriff auf die Popups nach dem Laden der Daten
let popups = document.getElementsByClassName("popup");

async function togglePopup(num) {
  popups[num].classList.toggle("active");
}

async function holeDaten(url) {
  try {
    let data = await fetch(url);
    return await data.json();
  } catch (error) {
    console.error(error);
  }
}

async function getDataAndColorize() {
  try {
    let parkingData = await holeDaten("https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20");
    let results = parkingData.results; // Zugriff auf die tatsächlichen Ergebnisse

    for (let i = 0; i < results.length; i++) {
      let parkingLot = results[i];
      let occupancy = parkingLot.auslastung_prozent;
      let knopfColor = getColorFromOccupancy(occupancy);
      let freiePlaetze = parkingLot.free;
      let totalPlaetze = parkingLot.total;
      
      // Überprüfe, ob das .dot-Element existiert, bevor du darauf zugreifst
      let dot = document.querySelectorAll(".dot")[i];
      if (dot) {
        dot.style.backgroundColor = knopfColor;
      }
      
      // Update the free spaces in the popup
      let popup = popups[i];
      if (popup) {
        let freeSpacesElement = popup.querySelector('li:nth-child(2)');
        if (freeSpacesElement) {
          freeSpacesElement.textContent = freiePlaetze + " freie Parkplätze von " + totalPlaetze;
        }
      }
    }

    // Eventlistener für Popup-Buttons einrichten
let closeBtns = document.getElementsByClassName("close-btn");
let openBtns = document.querySelectorAll(".badbahnhof, .claramatte, .steinen, .city, .storchen, .aeschen, .kunstmuseum, .undefined, .messe, .europe, .rebgasse, .clarahuus, .elisabethen, .postbasel, .bahnhofsued, .anfos, .centralbahnparking");

for (let i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener("click", function() {
    togglePopup(i);
  });
}

for (let i = 0; i < openBtns.length; i++) {
  openBtns[i].addEventListener("click", function() {
    togglePopup(i);
  });
}


  } catch (error) {
    console.error(error);
  }
}

getDataAndColorize(); // Funktion aufrufen, um Daten abzurufen und die Knöpfe zu färben

function getColorFromOccupancy(occupancy) {
  if (occupancy == 100) {
    return "black"; // Schwarz wenn voll
  } else if (occupancy >= 90) {
    return "#FF0000"; // Rot bei hoher Auslastung
  } else if (occupancy >= 70) {
    return "orange"; // Orange bei mittlerer Auslastung
  } else {
    return "green"; // Grün bei niedriger Auslastung
  }
}

getColorFromOccupancy(); // Funktion aufrufen, um die Farbe des Knopfes zu bestimmen

document.addEventListener('DOMContentLoaded', function() {
  const parkingList = document.getElementById('parking-list');

  fetch('https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20')
      .then(response => response.json())
      .then(data => {

          const results = data.results; // Access the 'results' array
          if (!results || !Array.isArray(results)) {
              throw new Error('Invalid API response structure');
          }

          // IDs or names of records to be skipped
          const namesToSkip = [null, "Post Basel"]; // Example names

          const filteredResults = results.filter(parking => 
              !namesToSkip.includes(parking.name)
          );

          filteredResults.forEach(parking => {
              const listItem = document.createElement('li');
              let auslastungProzent = (parking.auslastung_prozent || 0).toFixed(0); // Reduziere Dezimalstellen auf 0
              
              // Überprüfen, ob der Wert negativ ist und ggf. auf 0 setzen
              if (auslastungProzent < 0) {
                  auslastungProzent = 0;
              }

// Geo-Location Daten
const lon = parking.geo_point_2d.lon;
const lat = parking.geo_point_2d.lat;

              listItem.innerHTML = `
                  <h2>${parking.title}</h2>
                  <p> Total Parkplätze: ${parking.total}</p>
                  <p>Freie Parkplätze: ${parking.free} von ${parking.total}</p>
                  <p>Auslastung: ${auslastungProzent}%</p>
                  <a href="${parking.link}" target="_blank">Webseite Parkhaus</a>
                  <a href="https://www.google.ch/maps/search/?api=1&query=${lat},${lon}" target="_blank">Navigation</a>
              `;
              parkingList.appendChild(listItem);
          });
      })
      .catch(error => {
          console.error('Error fetching data:', error);
          const listItem = document.createElement('li');
          listItem.textContent = 'Fehler beim Laden der Daten';
          parkingList.appendChild(listItem);
      });
});

// Funktion zum Filtern der Parkhäuser
function filterParkingHouses() {
  const searchInput = document.getElementById('searchBar').value.toLowerCase();
  const parkingList = document.getElementById('parking-list');
  const parkings = parkingList.getElementsByTagName('li');

  for (let i = 0; i < parkings.length; i++) {
    const parkingTitle = parkings[i].getElementsByTagName('h2')[0].textContent.toLowerCase();
    if (parkingTitle.includes(searchInput)) {
      parkings[i].style.display = '';
    } else {
      parkings[i].style.display = 'none';
    }
  }
}
