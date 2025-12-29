import WeatherCard from "../WeatherCard/WeatherCard.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { getWeatherCondition } from "../../utils/weatherApi.js";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import "./Main.css";

const Main = ({ clothingItems, onCardClick, temperature }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const hasTemperature = temperature && typeof temperature.F === "number";

  const filteredItems = hasTemperature
    ? clothingItems.filter(
        (item) => item.weather === getWeatherCondition(temperature.F)
      )
    : clothingItems;

  return (
    <main className="main">
      <WeatherCard temperature={temperature} />

      <section className="clothes-section">
        {hasTemperature && (
          <p className="clothes-section__title">
            Today is {temperature[currentTemperatureUnit]}°
            {currentTemperatureUnit} / You may want to wear:
          </p>
        )}

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
