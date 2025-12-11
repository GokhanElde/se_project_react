import "./WeatherCard.css";

const WeatherCard = ({ temperature }) => {
  return (
    <section className="weather">
      <p className="weather__temp">{Math.round(temperature)}°F</p>
    </section>
  );
};

export default WeatherCard;
