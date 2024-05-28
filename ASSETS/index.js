document.getElementById('flightForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const departDate = document.getElementById('departDate').value;
  const returnDate = document.getElementById('returnDate').value;
 

  const queryString = `?origin=${origin}&destination=${destination}&departDate=${departDate}&returnDate=${returnDate}`;
  window.location.href = `secound.html${queryString}`;
});
