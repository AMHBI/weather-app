import { getData,sunrise,sunset } from "./functions.js";
const searchDiv = document.getElementById("search");
const searchInput = searchDiv.querySelector("input");
const searchBtn = searchDiv.querySelector("button")
const currentDiv = document.getElementById("current")

  const renderCurrnetWeather = ()=>{
    
}
searchBtn.addEventListener("click",async ()=>{
 const data =await getData("current",searchInput.value)
 console.log(data);
 currentDiv.innerHTML= ""
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
  <p>wind speed : ${data.wind.speed} m/s</p>
</div>
</div>
</div>
`
currentDiv.innerHTML =  currentJSX;
})