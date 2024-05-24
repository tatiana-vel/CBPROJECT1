// first API that give original sky, destination, date of travel and returen.
// const url =
//   "https://sky-scrapper.p.rapidapi.com/api/v1/flights/getPriceCalendar?originSkyId=BOM&destinationSkyId=JFK&fromDate=2024-02-20";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "eccc5f3a4cmsh90835496bbff0a0p1d1487jsn9b7579e3d4d2",
//     "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
//   },
// };

// try {
//   const response = fetch(url, options)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// } catch (error) {
//   console.error(error);
// }

// // SECOUND API
const url =
  "https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=35.5&lon=-78.5";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "eccc5f3a4cmsh90835496bbff0a0p1d1487jsn9b7579e3d4d2",
    "X-RapidAPI-Host": "weatherbit-v1-mashape.p.rapidapi.com",
  },
};

try {
  const response = fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
} catch (error) {
  console.error(error);
}
