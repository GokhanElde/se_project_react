import WeatherCard from "./WeatherCard/WeatherCard.jsx";
import ItemCard from "./ItemCard.jsx";
import { getWeatherCondition } from "../utils/weatherApi.js";

const Main = ({ clothingItems, onCardClick, temperature }) => {
  const weatherType = getWeatherCondition(temperature);

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

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

export default Main;
