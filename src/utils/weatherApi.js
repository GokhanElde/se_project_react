const apiKey = "67d35008ddfd1dbf2fbf809d2f661273";

const latitude = "42.3601";
const longitude = "-71.0589";

export const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error("Weather API error");
      }
      return res.json();
    })
    .then((data) => {
      return {
        temperature: Number(data.main.temp),
        city: data.name,
      };
    })
    .catch(() => {
      return {
        temperature: null,
        city: "",
      };
    });
};

export const getWeatherCondition = (temperature) => {
  if (temperature >= 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
