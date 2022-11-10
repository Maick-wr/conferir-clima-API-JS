const apiKey = "e55f0cc29604835b532761fd5900f441";
const apiCountryURL = "https://www.countryflagicons.com/FLAT/64/";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const loader = document.querySelector("#loader");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");

const weatherData = document.getElementById("weather-data");
// funções

// Loader
const toggleLoader = () => {
  loader.classList.toggle("hide");
};

const getWeatherData = async (city) => {
  toggleLoader();

  const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

  const res = await fetch(apiWeatherUrl);
  const data = await res.json();

  toggleLoader();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  cityElement.innerText = data.name;
  tempElement.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", apiCountryURL + data.sys.country + ".png");
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}Km/h`;
  weatherData.classList.remove("hide");
};

//Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
