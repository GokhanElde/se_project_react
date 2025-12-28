import { checkResponse } from "./api";

const apiKey = "67d35008ddfd1dbf2fbf809d2f661273";
const latitude = "42.3601";
const longitude = "-71.0589";

export const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse);
};

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
