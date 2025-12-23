import "./WeatherCard.css";
import sun from "../../assets/weather/sun.png";
import cloud from "../../assets/weather/cloud.png";

const WeatherCard = ({ temperature }) => {
  if (typeof temperature !== "number") {
    return null;
  }

  return (
    <section className="weather">
      <div className="weather__bar">
        <p className="weather__temp">{Math.round(temperature)}°F</p>

        <img src={sun} alt="Sunny" className="weather__sun" />
        <img src={cloud} alt="Cloudy" className="weather__cloud" />
      </div>
    </section>
  );
};

export default WeatherCard;
