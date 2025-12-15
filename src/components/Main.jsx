import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "./ItemCard/ItemCard.jsx";
import { getWeatherCondition } from "../utils/weatherApi.js";

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
      <ul className="cards">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </main>
  );
};

<p style={{ color: "red" }}>MAIN RENDER EDİLDİ</p>;

export default Main;
