import { dayPicker, getData, sunrise, sunset } from "./functions.js";
const searchDiv = document.getElementById("search");
const searchInput = searchDiv.querySelector("input");
const searchBtn = searchDiv.querySelector("button");
const currentDiv = document.getElementById("current");
const forecastDiv = document.getElementById("forecast");
const locationLogo = document.getElementById("location-logo");

const getCurrentData = async () => {
  const data = await getData("current", searchInput.value);
  return data;
};
const getCurrentDataByLocation = async () => {
  const data = await getData("current", getUserLocation());
  return data;
};
const getForecastData = async () => {
  const data = await getData("forecast", searchInput.value);
  return data;
};
const getForecastDataByLocation = async () => {
  const data = await getData("forecast", getUserLocation());
  return data;
};

const renderCurrnetWeather = async (data) => {
  currentDiv.innerHTML = "";
  try {
    const currentJSX = `
    <div class="text-white text-center flex flex-col items-center">
   <h3 class="text-5xl font-semibold">${data.name},${data.sys.country}</h3>
   <p>Today</p>
   <img
   src="./assets/icons/openw-icons/${data.weather[0].icon}.svg"
   alt="current weather"
   class="size-36 mt-3" />
   <p>${data.weather[0].main}</p>
   <p>${data.weather[0].description}</p>
   <div class="flex flex-wrap justify-evenly items-center">
   <div>
     <img src="./assets/icons/temperature.svg" alt="" />
     <p>Temp : ${Math.round(data.main.temp)} °C</p>
   </div>
   <div>
     <img src="./assets/icons/humidity.svg" alt="" />
     <p>humidity : ${data.main.humidity}%</p>
   </div>
   <div>
     <img src="./assets/icons/sunrise.svg" alt="" />
     <p>sunrise : ${sunrise(data.sys.sunrise)}</p>
   </div>
   <div>
     <img src="./assets/icons/sunset.svg" alt="" />
     <p>sunset : ${sunset(data.sys.sunset)}</p>
   </div>
   <div>
     <img src="./assets/icons/wind-speed.svg" alt="" />
     <p>wind speed : ${Math.round(data.wind.speed)} m/s</p>
     </div>
     </div>
     </div>
     `;
    currentDiv.innerHTML = currentJSX;
  } catch (error) {
    console.log(error);
  }
};
const renderForecastWeather = async (data) => {
  const filterdData = data.list.filter((item) =>
    item.dt_txt.endsWith("12:00:00")
  );
  console.log(filterdData);
  try {
    const forecastJSX = filterdData.map(
      (item) => `
    <div
        class="w-[40%] md:w-[15%] bg-white/40 text-white backdrop-blur-2xl m-2 rounded-2xl flex flex-col justify-center items-center p-5">
        <img
          src="./assets/icons/openw-icons/${item.weather[0].icon}.svg"
          alt="Weather Icon"
          class="size-24" />
        <h5 class="font-semibold text-xl">${dayPicker(
          new Date(item.dt * 1000).getDay()
        )}</h5>
        <div class="flex gap-3 mt-4">
          <span>${item.weather[0].main}</span>
          <span>${Math.round(item.main.temp)}°C</span>
        </div>
        <div class="mt-5 flex gap-3 items-center">
          <img
            src="./assets/icons/humidity.svg"
            alt="humidity Icon"
            class="size-8" />
          <span>${item.main.humidity}%</span>
        </div>
        
      </div>
    `
    );
    forecastDiv.innerHTML = forecastJSX;
  } catch (error) {}
};

const locationHandler = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    alert("Your Browser  does not support GeoLocation");
  }
};
const positionCallback = async (position) => {
  const currentData = await getData("current", position.coords);
  const forecastData = await getData("forecast", position.coords);
  renderCurrnetWeather(currentData);
  renderForecastWeather(forecastData);
};
const errorCallback = async (error) => {
  console.log(error.message);
};
const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("Enter Valid Name!");
  }
  const currentData = await getData("current", cityName);
  const forecastData = await getData("forecast", cityName);
  renderCurrnetWeather(currentData);
  renderForecastWeather(forecastData);
};
searchBtn.addEventListener("click", searchHandler);
locationLogo.addEventListener("click", locationHandler);
