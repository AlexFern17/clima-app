function updateWeather(response) {
  let cityTempUpdate = document.querySelector(".city-temp");
  cityTempUpdate.innerHTML = Math.round(response.data.temperature.current);
  let cityNameUpdate = document.querySelector("#city-name");
  cityNameUpdate.innerHTML = response.data.city;

  /*  let cityHumidUpdate = document.querySelector(".city-details strong");
  cityHumidUpdate.innerHTML = response.data.temperature.humidity;

  console.log(response.data.wind);*/
  //innerHTML = response.data.temperature.humidity
}

function searchCity(city) {
  //call API
  let apiKey = "097041f091d320fa0aa8fbb43t7o1142";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmit);
