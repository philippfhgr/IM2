document.addEventListener('DOMContentLoaded', function() {
    const parkingList = document.getElementById('parking-list');

    fetch('https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20')
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data); // Log the entire response for debugging

            const results = data.results; // Access the 'results' array
            if (!results || !Array.isArray(results)) {
                throw new Error('Invalid API response structure');
            }

            results.forEach(parking => {
                const listItem = document.createElement('li');
                let auslastungProzent = (parking.auslastung_prozent || 0).toFixed(0); // Reduziere Dezimalstellen auf 0
                
                // Überprüfen, ob der Wert negativ ist und ggf. auf 0 setzen
                if (auslastungProzent < 0) {
                    auslastungProzent = 0;
                }

                listItem.innerHTML = `
                    <h2>${parking.title}</h2>
                    <p> Total Parkplätze: ${parking.total}</p>
                    <br>
                    Freie Parkplätze: ${parking.free} von ${parking.total}</p>
                    <br>
                    <p>Auslastung: ${auslastungProzent}%</p>
                    <br>
                    <a href="${parking.link}" target="_blank">Webseite Parkhaus</a>
                    <br>
                    <a href="https://www.google.ch/maps/place/${encodeURIComponent(parking.name)}" target="_blank">Navigation</a>
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

