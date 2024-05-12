function updateWeather(response) {
  let cityTempUpdate = document.querySelector(".city-temp");
  cityTempUpdate.innerHTML = `${Math.round(response.data.temperature.current)}`;

  let cityNameUpdate = document.querySelector("#city-name");
  cityNameUpdate.innerHTML = response.data.city;

  let cityHumidUpdate = document.querySelector(".city-details strong");
  cityHumidUpdate.innerHTML = `${response.data.temperature.humidity}%`;

  let cityWindUpdate = document.querySelector("#windSpeed");
  cityWindUpdate.innerHTML = `${response.data.wind.speed} km/h`;

  let timeUpdate = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeUpdate.innerHTML = formatDate(date);

  let conditionsUpdate = document.querySelector("#conditions");
  conditionsUpdate.innerHTML = response.data.condition.description;

  let iconUpdate = document.querySelector(".city-icon");
  iconUpdate.innerHTML = `<img src="${response.data.condition.icon_url}" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
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

searchCity("Dallas");
