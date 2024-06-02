const access_key = "ab668de2367deb17548466790b816817";
const weatherAPIKey = "9990878e4fmshdb651a79b350088p178370jsn741b1b85ff98";

window.addEventListener("load", async function () {
  const params = new URLSearchParams(window.location.search);
  const origin = params.get("origin") || "";
  const destination = params.get("destination") || "";
  const departDate = params.get("departDate") || "";
  const returnDate = params.get("returnDate") || "";

  // First API that gives original sky, destination, date of travel and return, and the prices from aviationstack.\

  const displayFlightInfo = (flights) => {
    const flightDetailsElement = document.getElementById("flightDetails");
    flightDetailsElement.innerHTML = `<div class="card">
                                        <div class="card-section">
                                          <p>Origin: ${origin}</p>
                                          <p>Destination: ${destination}</p>
                                          <p>Departure Date: ${departDate}</p>
                                          <p>Return Date: ${returnDate}</p>
                                        </div>
                                      </div>
                                      <div class="card">
                                        <div class="card-section">
                                          <h4>Flights</h4>
                                          <ul>
                                            ${flights
                                              .map(
                                                (flight) => `
                                              <li>
                                                <p>Flight Number: ${flight.flight.number}</p>
                                                <p>Flight Date: ${flight.flight_date}</p>
                                                <p>Departure Airport: ${flight.departure.airport}</p>
                                                <p>Arrival Airport: ${flight.arrival.airport}</p>
                                                <p>Airline: ${flight.airline}</p>
                                              </li>
                                            `
                                              )
                                              .join("")}
                                          </ul>
                                        </div>
                                      </div>`;
  };
  const fetchFlightInfo = async () => {
    const url1 = `http://api.aviationstack.com/v1/flights?access_key=${access_key}`;
    try {
      const response = await fetch(url1);
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
    weatherDetailsElement.innerHTML = `<div class="card">
                                          <div class="card-section">
                                            <h4>Weather in ${weather.name}</h4>
                                            <p>Temperature: ${weather.main.temp}°C</p>
                                            <p>Weather: ${weather.weather[0].description}</p>
                                          </div>
                                        </div>`;
  };

  const fetchWeatherInfo = async (destination) => {
    const url2 = `https://open-weather13.p.rapidapi.com/city/${destination}/EN`;
    const options2 = {
      method: "GET",
      headers: {
        "x-rapidapi-key": weatherAPIKey,
        "x-rapidapi-host": "open-weather13.p.rapidapi.com",
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
  fetchFlightInfo();
  fetchWeatherInfo(destination);
});
