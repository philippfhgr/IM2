document.addEventListener('DOMContentLoaded', () => {
    const dataList = document.getElementById('data-list');
  
    // Function to create list items from data
    function createListItems(data) {
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.textContent = item.name; // Assuming the API returns objects with a 'name' property
            dataList.appendChild(listItem);
        });
    }
  
    // Fetch data from the API
    fetch('https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=20') // Replace with your API endpoint
        .then(response => response.json())
        .then(data => {
            createListItems(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
  });