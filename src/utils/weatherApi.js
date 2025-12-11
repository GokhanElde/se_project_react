const APIkey = "YOUR_API_KEY_HERE";

const latitude = "42.3601"; // Boston
const longitude = "-71.0589";

export const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Weather API error");
      }
      return res.json();
    })
    .then((data) => {
      return {
        temperature: data.main.temp,
        city: data.name,
      };
    });
};

export const getWeatherCondition = (temp) => {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
};
