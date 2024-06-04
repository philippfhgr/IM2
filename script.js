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

