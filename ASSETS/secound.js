const access_key = 'b9f0b894754ddf0f7168cd1d6c49fabd';
const weather_api_key = '2ee2b5611emsh448f1a1bdd44662p1ac6fajsnf171177881bd';
//use your own API

window.addEventListener("load", async function () {
  const params = new URLSearchParams(window.location.search);
  const origin = params.get("origin");
  const destination = params.geti("destnation");
  const departDate = params.get("departDate");
  const returnDate = params.get("returnDate");

  // First API that gives original sky, destination, date of travel and return, and the prices from sky scrapper.\
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
                                      <div class="grid-container">

                                      <div class="grid-x grid-margin-x align-center">
                                        <div class="cell small-12 medium-12 large-12">
                                          <div class="card border">
                                              <div class="card-section">
                                                  <p> <span>Flight Date</span>: ${data[0].flight_date}</p>
                                                  <p> <span>Flight Number</span>: ${data[0].flight.number}</p>
                                                  <p> <span>Departure Airport</span>: ${data[0].departure.airport}</p>
                                                  <p> <span>Arrival Airport</span>: ${data[0].arrival.airport}</p>
                                                  <p> <span>Airline</span>: ${data[0].airline.name}</p>
                                              </div>
                                          </div>
                                          <div class="card border">
                                              <div class="card-section">
                                                  <p> <span>Flight Number</span>: ${data[1].flight.number}</p>
                                                  <p> <span>Flight Date</span>: ${data[1].flight_date}</p>
                                                  <p> <span>Departure Airport</span>: ${data[1].departure.airport}</p>
                                                  <p> <span>Arrival Airport</span>: ${data[1].arrival.airport}</p>
                                                  <p> <span>Airline</span>: ${data[1].airline.name}</p>
                                              </div>
                                          </div>
                                          <div class="card border">
                                              <div class="card-section">
                                                  <p> <span>Flight Number</span>: ${data[2].flight.number}</p>
                                                  <p> <span>Flight Date</span>: ${data[2].flight_date}</p>
                                                  <p> <span>Departure Airport</span>: ${data[2].departure.airport}</p>
                                                  <p> <span>Arrival Airport</span>: ${data[2].arrival.airport}</p>
                                                  <p> <span>Airline</span>: ${data[2].airline.name}</p>
                                              </div>
                                          </div>
                                      </div>
                                      </div>
                                  </div>
                                      `;
  };
  const fetchFlightInfo = async () => {
    const baseURL = "http://api.aviationstack.com/v1/flights";
    const params = new URLSearchParams();
    params.append('access_key', access_key);
    params.append('limit', '3');
    params.append('flight_status', 'scheduled');

    try {
      params.append('dep_iata', await getCityIata(origin));
    }
    catch (error){
      console.error("Error getting city:", error);
      const flightDetailsElement = document.getElementById("flightDetails");
      flightDetailsElement.innerHTML = `<p>City named "${origin}" not found.</p>`;
      return;
    }

    try {
      params.append('arr_iata', await getCityIata(destination));
    }
    catch (error){
      console.error("Error getting city:", error);
      const flightDetailsElement = document.getElementById("flightDetails");
      flightDetailsElement.innerHTML = `<p>City named "${destination}" not found.</p>`;
      return;
    }

    // params.append('arr_scheduled_time_arr', returnDate);
    params.append('arr_scheduled_time_dep', departDate);
    // params.append('flight_date', departDate);

    const url = new URL(baseURL);
    url.search = params.toString();
    const options = {
        method: "GET",
    };
    try {
      const response = await fetch(url, options);
      // const response = await fetch("./100flight.json");
      const data = await response.json();
      // const data = response;
      console.log("Flight Data:", data);

      if (data && data.data) {
        displayFlightInfo(data.data);
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
  async function getCityIata(cityName){
    // search feature is ony available for paid plans
    // so we're fetch all cities and search ourselves
    const baseURL = "http://api.aviationstack.com/v1/cities";
    const params = new URLSearchParams();
    params.append('access_key', access_key);
    const url = new URL(baseURL);
    url.search = params.toString();
    const options = {
        method: "GET",
    };
    // const response = await fetch(url, options);
    const response = await fetch("./100cities.json");
    const jsonResponse = await response.json();
    // const jsonResponse = response;

    const city = jsonResponse.data.filter((city) => {
        return city.city_name.startsWith(cityName);
    })[0];
    return city.iata_code;
}

  // Second API that displays the weather from Open Weather.
  const displayWeatherInfo = (location, description) => {
    const weatherDetailsElement = document.getElementById("weatherDetails");
    weatherDetailsElement.innerHTML = `                               
                                      <div class="grid-container">
                                        <div class="grid-x grid-margin-x align-center">
                                        <div class="cell small-12 medium-6 large-6">
                                            <div class="card">
                                                <div class="card-section">
                                                  <p>Here's a description of the weather in ${location}</p>
                                                  <p>description: The weather looks ${description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                      </div>
                                      `;
  };

  // DO NOT NEED THIS

  // const fetchWeatherInfo = async (lat, lon) => {
  //   const url2 = https://open-weather13.p.rapidapi.com/city/latlon/${lat}/${lon};
  //   const options2 = {
  //     method: "GET",
  //     headers: {
  //       "X-RapidAPI-Key": "9d03b74520msh4dde0b7de087279p1db39djsn458074310cff",
  //       "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
  //     },
  //   };
  //   try {
  //     const response = await fetch(url2, options2);
  //     const data = await response.json();
  //     console.log("Weather Data:", data);

  //     if (data && data.name && data.main && data.weather) {
  //       displayWeatherInfo(data);
  //     } else {
  //       console.error("Invalid weather data structure:", data);
  //       const weatherDetailsElement = document.getElementById("weatherDetails");
  //       weatherDetailsElement.innerHTML =
  //         "<p>No weather information available.</p>";
  //     }
  //   } catch (error) {
  //     console.error("Error fetching weather data:", error);
  //     const weatherDetailsElement = document.getElementById("weatherDetails");
  //     weatherDetailsElement.innerHTML =
  //       "<p>Error fetching weather information.</p>";
  //   }
  // };


  // API 3 that pull city weather we need lat and lon.
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
      console.log(result);
      console.log(result.weather[0].description);
      let location = result.name;
      let description = result.weather[0].description;
      displayWeatherInfo(location, description);
    } catch (error) {
      console.error(error);
    }
  }


  cityWeather(destination);
  fetchFlightInfo();
  // fetchWeatherInfo();


  
});