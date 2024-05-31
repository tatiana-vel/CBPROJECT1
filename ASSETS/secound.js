window.addEventListener("load", async function () {
  const params = new URLSearchParams(window.location.search);
  const origin = params.get("origin");
  const destination = params.get("destination");
  const departDate = params.get("departDate");
  const returnDate = params.get("returnDate");

  // First API that gives original sky, destination, date of travel and return, and the prices from sky scrapper.\
  const displayFlightInfo = (flights) => {
    const flightDetailsElement = document.getElementById("flightDetails");
    flightDetailsElement.innerHTML = `<p>Origin: ${origin}</p>
                                      <p>Destination: ${destination}</p>
                                      <p>Departure Date: ${departDate}</p>
                                      <p>Return Date: ${returnDate}</p>
                                      <ul>
                                        ${flights
                                          .map((flight) => `<li>${flight}</li>`)
                                          .join("")}
                                      </ul>`;
  };
  const fetchFlightInfo = async () => {
    const url1 = `http://api.aviationstack.com/v1/flights?access_key=b860459554488b5f10ca3fb3f046a2ac`;
    const options1 = {
      method: "GET",
    };

    try {
      const response = await fetch(url1, options1);
      const data = await response.json();
      console.log("Flight Data:", data);

      if (data && data.data) {
        displayFlightInfo(data.data);
      } else {
        console.error("Invalid flight data structure:", data);
        const flightDetailsElement = document.getElementById("flightDetails");
        flightDetailsElement.innerHTML =
          "<p>Sorry, there is no available fligh.</p>";
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
      const flightDetailsElement = document.getElementById("flightDetails");
      flightDetailsElement.innerHTML =
        "<p>Error fetching flight information.</p>";
    }
  };
  // Second API that displays the weather from Open Weather.
  const displayWeatherInfo = (weather) => {
    const weatherDetailsElement = document.getElementById("weatherDetails");
    weatherDetailsElement.innerHTML = `<p>Weather in ${weather.name}:</p>
                                        <p>Temperature: ${weather.main.temp}°C</p>
                                        <p>Weather: ${weather.weather[0].description}</p>`;
  };

  const fetchWeatherInfo = async (lat, lon) => {
    const url2 = `https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon}`;
    const options2 = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9d03b74520msh4dde0b7de087279p1db39djsn458074310cff",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };
    try {
      const response = await fetch(url2, options2);
      const data = await response.json();
      console.log("Weather Data:", data);

      if (data && data.name && data.main && data.weather) {
        displayWeatherInfo(data);
      } else {
        console.error("Invalid weather data structure:", data);
        const weatherDetailsElement = document.getElementById("weatherDetails");
        weatherDetailsElement.innerHTML =
          "<p>No weather information available.</p>";
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      const weatherDetailsElement = document.getElementById("weatherDetails");
      weatherDetailsElement.innerHTML =
        "<p>Error fetching weather information.</p>";
    }
  };
  // API 3 that pull city weatherwe need lat and lon.
  async function cityWeather(destination) {
    const url = `https://open-weather13.p.rapidapi.com/city/${destination}/EN`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "9d03b74520msh4dde0b7de087279p1db39djsn458074310cff",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
      console.log(result.weather.description);
    } catch (error) {
      console.error(error);
    }
  }
  cityWeather(destination);
  fetchFlightInfo();
  fetchWeatherInfo();
}); 