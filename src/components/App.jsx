import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import ItemModal from "./ItemModal/ItemModal.jsx";
import AddGarmentModal from "./AddGarmentModal/AddGarmentModal.jsx";
import Profile from "./Profile/Profile.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal.jsx";

import { getWeather } from "../utils/weatherApi.js";
import { getItems, addItem, deleteItem } from "../utils/api";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import "../App.css";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [weatherData, setWeatherData] = useState({
    temperature: null,
    city: "",
  });

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setItemToDelete(null);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const handleOpenAddGarmentModal = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setActiveModal("confirm-delete");
  };

  const handleAddGarment = ({ name, imageUrl, weather }) => {
    return addItem({ name, imageUrl, weather }).then((newItem) => {
      setClothingItems((prev) => [newItem, ...prev]);
    });
  };

  const handleConfirmDelete = () => {
    return deleteItem(itemToDelete._id).then(() => {
      setClothingItems((prev) =>
        prev.filter((item) => item._id !== itemToDelete._id)
      );
      closeActiveModal();
    });
  };

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData({
          temperature: {
            F: data.main?.temp ?? null,
            C: data.main?.temp
              ? Math.round(((data.main.temp - 32) * 5) / 9)
              : null,
          },
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

  useEffect(() => {
    getItems()
      .then(setClothingItems)
      .catch(() => setClothingItems([]));
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <Header
          city={weatherData.city}
          onAddClothes={handleOpenAddGarmentModal}
        />

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
                  onAddClothes={handleOpenAddGarmentModal}
                />
              }
            />
          </Routes>
        </main>

        <Footer />

        <AddGarmentModal
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onAddGarment={handleAddGarment}
        />

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={closeActiveModal}
          onDelete={handleDeleteClick}
        />

        <ConfirmDeleteModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeActiveModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
