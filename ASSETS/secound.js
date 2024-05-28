window.addEventListener("load", async function () {
  const params = new URLSearchParams(window.location.search);
  const origin = params.get("origin");
  const destination = params.get("destination");
  const departDate = params.get("departDate");
  const returnDate = params.get("returnDate");
  const cityInput = document.getElementById("city-input");
  const searchForm = document.querySelector("#search-form");

  // First API that gives original sky, destination, date of travel and return, and the prices from sky scrapper.
  const url1 =
    "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar?originSkyId=BOM&destinationSkyId=JFK&fromDate=2024-02-20";
  const options1 = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4ce04162a3msh02d8833875b9877p1488c9jsnd85174a5fa91",
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = fetch(url1, options1)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.data.flights, null, 2);
        console.log(data);
      });
  } catch (error) {
    console.error(error);
  }
  // Second API that displays the weather from Open Weather.
  const url2 = "https://open-weather13.p.rapidapi.com/city/NEW%20YORK/EN";
  const options2 = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4ce04162a3msh02d8833875b9877p1488c9jsnd85174a5fa91",
      "x-rapidapi-host": "open-weather13.p.rapidapi.com",
    },
  };

  try {
    const responsky = fetch(url2, options2)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.name);
        console.log(data.coord);
        console.log(data.clouds);
        console.log(data.weather);
      });
  } catch (error) {
    console.error(error);
  }
});
