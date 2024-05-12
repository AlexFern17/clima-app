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

  updateForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay() + 1];
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

function updateForecast(city) {
  let apiKey = "097041f091d320fa0aa8fbb43t7o1142";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="weather-forecast-day">    
      <div class="forecast-date">${formatDay(day.time)}</div>
          <div class="forecast-icon">
          <img src="${day.condition.icon_url}"/></div>
          <div class="forecast-temps">
            <span class="forecast-temp-low">${Math.round(
              day.temperature.minimum
            )}°C</span>
            <span class="forecast-temp-high">${Math.round(
              day.temperature.maximum
            )}°C</span>
          </div>
        </div>
        `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

searchCity("Dallas");
