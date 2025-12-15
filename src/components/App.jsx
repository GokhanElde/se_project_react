import { useState, useEffect } from "react";
import Header from "./Header/Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ModalWithForm from "./ModalWithForm/ModalWithForm.jsx";
import ItemModal from "./ItemModal/ItemModal.jsx";

import { defaultClothingItems } from "../utils/clothingItems.js";
import { getWeather, getWeatherCondition } from "../utils/weatherApi.js";
import "../App.css";

function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const [weatherData, setWeatherData] = useState({
    temperature: "",
    city: "",
  });

  useEffect(() => {
    getWeather().then((data) => {
      setWeatherData(data);
    });
  }, []);

  const handleOpenAddItemModal = () => {
    setActiveModal("add-item");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <Header onAddClothes={handleOpenAddItemModal} city={weatherData.city} />

      <Main
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
        temperature={weatherData.temperature}
      />

      <Footer />

      <ModalWithForm
        title="New Garment"
        name="add-item"
        buttonText="Add"
        isOpen={activeModal === "add-item"}
        onClose={handleCloseModal}
      >
        <label>
          Name
          <input type="text" name="name" required />
        </label>

        <label>
          Image URL
          <input type="url" name="link" required />
        </label>

        <label>
          Weather
          <select name="weather" required>
            <option value="hot">Hot</option>
            <option value="warm">Warm</option>
            <option value="cold">Cold</option>
          </select>
        </label>
      </ModalWithForm>

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;
