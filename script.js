function getBusArrivals() {
  const busStopId = document.getElementById('busStopId').value.trim();

  if (!busStopId) {
    alert('Please enter a Bus Stop ID');
    return;
  }

  const apiUrl = `https://sg-bus-arrivals.vercel.app/?id=${busStopId}`;

  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch data');
      return response.json();
    })
    .then((data) => {
      displayBusArrivals(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      alert('Error fetching bus arrivals. Please check the Bus Stop ID.');
    });
}

function displayBusArrivals(data) {
  const tableBody = document.querySelector('#busTable tbody');
  tableBody.innerHTML = ''; // Clear previous results

  // Check if there are no bus services available
  if (!data || !data.services || data.services.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="3">No buses arriving.</td></tr>';
    return;
  }

  // Populate the table with bus information
  data.services.forEach((bus) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${bus.no || 'Unknown'}</td>
      <td>${bus.operator || 'Unknown'}</td>
      <td>${
        bus.next_bus_mins !== undefined ? bus.next_bus_mins : 'N/A'
      } mins</td>
    `;
    tableBody.appendChild(row);
  });
}
