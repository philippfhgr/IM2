document.addEventListener('DOMContentLoaded', function() {
    const parkhausList = document.getElementById('parkhausList');

    fetch('https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20')
        .then(response => response.json())
        .then(data => {
            const results = data.results;
            results.forEach(results => {
                const items = results.results.items;
                const listItem = document.createElement('li');
                
                // Erstelle Elemente für jede Information
                const title = document.createElement('h2');
                title.textContent = items.name;
                
                const availability = document.createElement('p');
                availability.textContent = `${items.available_parking_spaces} freie Parkplätze von ${items.total_parking_spaces}`;
                
                const websiteLink = document.createElement('a');
                websiteLink.href = items.website;
                websiteLink.textContent = 'Webseite Parkhaus';
                
                const navigationLink = document.createElement('a');
                navigationLink.href = items.navigation_link;
                navigationLink.textContent = 'Navigation';
                
                // Füge Elemente dem Listenelement hinzu
                listItem.appendChild(title);
                listItem.appendChild(availability);
                listItem.appendChild(websiteLink);
                listItem.appendChild(document.createElement('br')); // Zeilenumbruch für Abstand
                listItem.appendChild(navigationLink);
                
                // Füge das Listenelement zur Parkhausliste hinzu
                parkhausList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
});