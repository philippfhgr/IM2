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
        console.log("Farbe für Parkhaus " + parkingLot.name + ": " + knopfColor);
      }
      
      // Update the free spaces in the popup
      let popup = popups[i];
      if (popup) {
        let freeSpacesElement = popup.querySelector('li:nth-child(2)');
        if (freeSpacesElement) {
          freeSpacesElement.textContent = freiePlaetze + " freie Parkplätze von " + totalPlaetze;
        }
      }

      console.log("Auslastung in Prozent: " + (occupancy)); // Ausgabe: Auslastung des Parkhauses
      console.log("Anzahl freie Parkplätz: " + (freiePlaetze)); // Ausgabe: freie Parkplätze
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
    return "black"; // Rot wenn voll
  } else if (occupancy >= 90) {
    return "#FF0000"; // Orange bei hoher Auslastung
  } else if (occupancy >= 70) {
    return "orange"; // Orange bei mittlerer Auslastung
  } else {
    return "green"; // Grün bei niedriger Auslastung
  }
}

getColorFromOccupancy(); // Funktion aufrufen, um die Farbe des Knopfes zu bestimmen

// Google Maps Karte

function initMap() {
  // Die Position für die Karte
  var myLatLng = { lat: 47.5651794, lng: 7.6089067 };

  // Erstelle eine neue Karte und zentriere sie auf die angegebenen Koordinaten
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: myLatLng
  });

  // Füge einen Marker an den angegebenen Koordinaten hinzu
  var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Parkhaus Bad. Bahnhof'
  });
}



function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: 47.5596, lng: 7.5886 } // Zentrum von Basel
  });

  var parkhausLocations = [
      { lat: 47.5655335, lng: 7.6085262, name: 'Parkhaus Badischer Bahnhof', popupId: 'popup-badischer-bahnhof' },
      { lat: 47.5639692, lng: 7.5946624, name: 'Parkhaus Claramatte', popupId: 'popup-claramatte' },
      { lat: 47.5524457, lng: 7.5859517, name: 'Parkhaus Steinen', popupId: 'popup-steinen' },
      // Weitere Parkhäuser hier hinzufügen...
  ];

  parkhausLocations.forEach(function (location) {
      var marker = new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name
      });

      marker.addListener('click', function () {
          document.querySelectorAll('.popup').forEach(function (popup) {
              popup.style.display = 'none';
          });
          document.getElementById(location.popupId).style.display = 'block';
      });
  });
}

