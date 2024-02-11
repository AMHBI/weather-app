const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "3c5533cee858f34fb863ab53b0e00f06";
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const getData = async (type, data) => {
  let url = null;
  if (typeof data === "string") {
    switch (type) {
      case "current":
        url = `${BASE_URL}/weather?q=${data}&appid=${API_KEY}&units=metric`;
        break;
      case "forecast":
        url = `${BASE_URL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
        break;
      default:
        console.log("Error type");
        break;
    }
  } else {
    switch (type) {
      case "current":
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
        break;
      case "forecast":
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`;
        break;
      default:
        console.log("Error type");
        break;
    }
  }
  try {
    const apidata = await fetch(url);
    const json = await apidata.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
const sunrise = (data) => {
  const sunrise =
    new Date(data * 1000).getHours() + ":" + new Date(data * 1000).getMinutes();
  return sunrise;
};
const sunset = (data) => {
  const sunset =
    new Date(data * 1000).getHours() + ":" + new Date(data * 1000).getMinutes();
  return sunset;
};
const dayPicker = date =>{
return daysInWeek[date]
}
export { getData, sunrise, sunset, dayPicker };
