import "./WeatherCard.css";
import sun from "../../assets/weather/sun.png";
import cloud from "../../assets/weather/cloud.png";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

const WeatherCard = ({ temperature }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!temperature) {
    return null;
  }

  return (
    <section className="weather">
      <div className="weather__bar">
        <p className="weather__temp">
          {temperature[currentTemperatureUnit]}°{currentTemperatureUnit}
        </p>

        <img src={sun} alt="Sunny" className="weather__sun" />
        <img src={cloud} alt="Cloudy" className="weather__cloud" />
      </div>
    </section>
  );
};

export default WeatherCard;
