let currentDate = document.querySelector("#date");
let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();
let day = now.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function showForecast(response) {
  let forecastDays = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class ="row">`;

  forecastDays.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      ` 
              <div class="col-2">
                <div class="forecast-day">${forecastDay.dt}</div>
                <img
                  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                  alt="forecast-pic"
                  width="40"
                />
                <div class="forecast-temperatures">
                  <span class="temperature-max"> ${forecastDay.temp.max} </span>
                  <span class="temperature-min"> ${forecastDay.temp.min} </span>
                </div>
              </div>
            `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let weekday = days[day];
currentDate.innerHTML = `${weekday} ${hours}:${minutes}`;

function getForecast(coordinates) {
  let apiKey = "e9749c87f79d989e0dfa640ff0c29863";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}

function showWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#query").value;
  let apiKey = "e9749c87f79d989e0dfa640ff0c29863";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelciusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

let search = document.querySelector("#search");
search.addEventListener("submit", searchCity);
