import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import AddItemModal from "./AddItemModal/AddItemModal.jsx";
import ItemModal from "./ItemModal/ItemModal.jsx";
import Profile from "./Profile/Profile.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal.jsx";

import { getWeather } from "../utils/weatherApi.js";
import { getItems, addItem, deleteItem } from "../utils/api";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import "../App.css";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [weatherData, setWeatherData] = useState({
    temperature: null,
    city: "",
  });

  const closeAllModals = () => {
    setActiveModal(null);
    setSelectedCard(null);
    setItemToDelete(null);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleOpenAddItemModal = () => {
    setActiveModal("add-item");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setActiveModal("confirm-delete");
  };

  const handleAddItem = (data) => {
    return addItem(data).then((newItem) => {
      setClothingItems((prev) => [newItem, ...prev]);
      closeAllModals();
    });
  };

  const handleConfirmDelete = () => {
    return deleteItem(itemToDelete._id).then(() => {
      setClothingItems((prev) =>
        prev.filter((item) => item._id !== itemToDelete._id)
      );
      closeAllModals();
    });
  };

  useEffect(() => {
    getWeather().then((data) => {
      setWeatherData({
        temperature: {
          F: data.main.temp,
          C: Math.round(((data.main.temp - 32) * 5) / 9),
        },
        city: data.name,
      });
    });
  }, []);

  useEffect(() => {
    getItems().then(setClothingItems);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <Header city={weatherData.city} onAddClothes={handleOpenAddItemModal} />

        <main className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  temperature={weatherData.temperature}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  openAddClothes={handleOpenAddItemModal}
                />
              }
            />
          </Routes>
        </main>

        <Footer />

        <AddItemModal
          isOpen={activeModal === "add-item"}
          onClose={closeAllModals}
          onAddGarment={handleAddItem}
        />

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={closeAllModals}
          onDelete={handleDeleteClick}
        />

        <ConfirmDeleteModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeAllModals}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
