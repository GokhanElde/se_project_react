import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "./ItemCard/ItemCard.jsx";
import { getWeatherCondition } from "../utils/weatherApi.js";
import "./Main.css";

const Main = ({ clothingItems, onCardClick, temperature }) => {
  const isValidTemperature = typeof temperature === "number";

  const filteredItems = isValidTemperature
    ? clothingItems.filter(
        (item) => item.weather === getWeatherCondition(temperature)
      )
    : clothingItems;

  return (
    <main className="main">
      <WeatherCard temperature={temperature} />

      <section className="clothes-section">
        <p className="clothes-section__title">
          Today is {Math.round(temperature)}°F / You may want to wear:
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
