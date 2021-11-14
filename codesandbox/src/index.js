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
  "Saturday"
];

let weekday = days[day];
currentDate.innerHTML = `${weekday} ${hours}:${minutes}`;

function showWeather(response) {
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#query").value;
  let apiKey = "e9749c87f79d989e0dfa640ff0c29863";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}

let search = document.querySelector("#search");
search.addEventListener("submit", searchCity);
