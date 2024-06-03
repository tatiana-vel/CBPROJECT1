document.getElementById('flightForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const departDate = document.getElementById('departDate').value;
  const returnDate = document.getElementById('returnDate').value;
 

  const queryString = `?origin=${origin}&destination=${destination}&departDate=${departDate}&returnDate=${returnDate}`;
  window.location.href = `secound.html${queryString}`;
});


$(document).foundation();


//Local storage 
// Handle form submission to save search history
$('#flightForm').on('submit', function(event) {
  event.preventDefault();
  
 const origin = $('#origin').val();
 const destination = $('#destination').val();
 const departDate = $('#departDate').val();
 const returnDate = $('#returnDate').val();

  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  searchHistory.push({ origin, destination, departDate, returnDate });
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  
  // Clear the form after submission
  $('#flightForm')[0].reset();

  alert('Flight booked and search history saved!');
});

// Populate search history modal
function populateSearchHistory() {
  const historyList = $('#historyList');
  historyList.empty();
  
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
  searchHistory.forEach((search, index) => {
    const listItem = `
      <li>
        <button class="button expanded" onclick="location.href='https://example.com/from-${search.origin.toLowerCase()}-to-${search.destination.toLowerCase()}'">From: ${search.origin} - To: ${search.destination}</button>
      </li>
    `;
    historyList.append(listItem);
  });
}

// Show search history modal
$('[data-open="searchHistoryModal"]').on('click', function() {
  populateSearchHistory();
});
