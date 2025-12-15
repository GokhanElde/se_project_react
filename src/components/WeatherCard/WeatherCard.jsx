import "./WeatherCard.css";

const WeatherCard = ({ temperature }) => {
  if (typeof temperature !== "number") {
    return null;
  }

  return (
    <section className="weather">
      <p className="weather__temp">{Math.round(temperature)}°F</p>
    </section>
  );
};

export default WeatherCard;
