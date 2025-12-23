import { useState, useEffect } from "react";

import Header from "./Header/Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ItemModal from "./ItemModal/ItemModal.jsx";
import AddGarmentModal from "./AddGarmentModal/AddGarmentModal.jsx";

import { defaultClothingItems } from "../utils/clothingItems.js";
import { getWeather } from "../utils/weatherApi.js";

import "../App.css";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const [weatherData, setWeatherData] = useState({
    temperature: null,
    city: "",
  });

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData({
          temperature: data.main?.temp ?? null,
          city: data.name ?? "Unknown location",
        });
      })
      .catch(() => {
        setWeatherData({
          temperature: null,
          city: "Unknown location",
        });
      });
  }, []);

  const handleOpenAddGarmentModal = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const closeAllModals = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleAddGarment = (newItem) => {
    setClothingItems((prevItems) => [newItem, ...prevItems]);
    closeAllModals();
  };

  return (
    <div className="page">
      <Header
        onAddClothes={handleOpenAddGarmentModal}
        city={weatherData.city}
      />

      <Main
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
        temperature={weatherData.temperature}
      />

      <Footer />

      <AddGarmentModal
        isOpen={activeModal === "add-garment"}
        onClose={closeAllModals}
        onAddGarment={handleAddGarment}
      />

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={closeAllModals}
      />
    </div>
  );
}

export default App;
