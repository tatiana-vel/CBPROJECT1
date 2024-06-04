const access_key = 'ab668de2367deb17548466790b816817';
const weather_api_key = '9990878e4fmshdb651a79b350088p178370jsn741b1b85ff98';
//use your own API

window.addEventListener("load", async function () {
  const params = new URLSearchParams(window.location.search);
  const origin = params.get("origin");
  const destination = params.get("destination");
  const departDate = params.get("departDate");
  const returnDate = params.get("returnDate");

  // First API that gives original sky, destination, date of travel and return, and the prices from AVIATIONSTACK.\
  const displayFlightInfo = (data) => {
    const flightDetailsElement = document.getElementById("flightDetails");
    flightDetailsElement.innerHTML = `                                   
                                      <div class="grid-container">
                                        <div class="grid-x grid-margin-x align-center">
                                          <div class="cell small-12 medium-6 large-6">
                                              <div class="card">
                                                  <div class="card-section">
                                                    <p>Origin: ${origin}</p>
                                                    <p>Destination: ${destination}</p>
                                                  </div>
                                              </div>
                                          </div>
                                          <div class="cell small-12 medium-6 large-6">
                                              <div class="card">
                                                  <div class="card-section">
                                                    <p>Departure Date: ${departDate}</p>
                                                    <p>Return Date: ${returnDate}</p>
                                                  </div>
                                              </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div class="grid-container">
                                        <div class="grid-x grid-margin-x align-center">

                                          ${data.map((flight) => (
                                                `<div class="cell small-12 medium-4 large-4">
                                                      <div class="card border">
                                                          <div class="card-section">
                                                              <p> <span>Flight Date</span>: ${flight.flight_date}</p>
                                                              <p> <span>Flight Number</span>: ${flight.flight.number}</p>
                                                              <p> <span>Departure Airport</span>: ${flight.departure.airport}</p>
                                                              <p> <span>Arrival Airport</span>: ${flight.arrival.airport}</p>
                                                              <p> <span>Airline</span>: ${flight.airline.name}</p>
                                                          </div>
                                                      </div>

                                            </div>`
                                              )).join("")
                                                }

                                        </div>
                                      </div>
                                      `;
  };
  const fetchFlightInfo = async () => {
    const baseURL = "http://api.aviationstack.com/v1/flights";
    const params = new URLSearchParams();
    params.append('access_key', access_key);
    const limit = 3;
    params.append('limit', limit.toString());


    const url = new URL(baseURL);
    url.search = params.toString();
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log("Flight Data:", data);

      if (data && data.data) {
        displayFlightInfo(data.data.slice(0, limit));
      } else {
        console.error("Invalid flight data structure:", data);
        const flightDetailsElement = document.getElementById("flightDetails");
        flightDetailsElement.innerHTML =
          "<p>Sorry, there is no available flights.</p>";
      }
    } catch (error) {
      console.error("Error fetching flight data:", error);
      const flightDetailsElement = document.getElementById("flightDetails");
      flightDetailsElement.innerHTML =
        "<p>Error fetching flight information.</p>";
    }
  };

  // Second API that displays the weather from Open Weather.
  const displayWeatherInfo = (weatherResult) => {
    const weatherDetailsElement = document.getElementById("weatherDetails");
    weatherDetailsElement.innerHTML = `                               
                                      <div class="grid-container">
                                        <div class="grid-x grid-margin-x align-center">
                                            <div class="cell small-12 medium-6 large-6">
                                                <div class="card">
                                                    <div class="card-section">
                                                    <p>Here's a description of the weather in ${weatherResult.name}:</p>
                                                    <p>Temperature: ${weatherResult.main.temp}°F</p>
                                                    <p>Description: ${weatherResult.weather[0].description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                      </div>
                                      `;
  };


  async function cityWeather(destination) {
    const url = `https://open-weather13.p.rapidapi.com/city/${destination}/EN`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": weather_api_key,
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      displayWeatherInfo(result);
    } catch (error) {
      console.error(error);
    }
  }


  cityWeather(destination);
  fetchFlightInfo();




});