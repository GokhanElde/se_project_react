import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "./ItemCard/ItemCard.jsx";
import { getWeatherCondition } from "../utils/weatherApi.js";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

const Main = ({ clothingItems, onCardClick, temperature }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!temperature) {
    return null;
  }

  const filteredItems = clothingItems.filter(
    (item) => item.weather === getWeatherCondition(temperature.F)
  );

  return (
    <main className="main">
      <WeatherCard temperature={temperature} />

      <section className="clothes-section">
        <p className="clothes-section__title">
          Today is {temperature[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards">
          {filteredItems.map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Main;
