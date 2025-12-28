import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer/Footer.jsx";
import AddItemModal from "./AddItemModal/AddItemModal.jsx";
import AddGarmentModal from "./AddGarmentModal/AddGarmentModal.jsx";
import Profile from "./Profile/Profile.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal";

import { getWeather } from "../utils/weatherApi.js";
import { getItems } from "../utils/api.js";
import { deleteItem } from "../utils/api";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import { useLocation } from "react-router-dom";

import "../App.css";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const location = useLocation();

  const [weatherData, setWeatherData] = useState({
    temperature: null,
    city: "",
  });

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setActiveModal("confirm-delete");
  };

  const handleOpenAddGarmentModal = () => {
    console.log("ADD CLOTHES CLICKED");
    setActiveModal("add-garment");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  useEffect(() => {
    getWeather().then((data) => {
      setWeatherData({
        temperature: {
          F: data.main?.temp ?? null,
          C: data.main?.temp
            ? Math.round(((data.main.temp - 32) * 5) / 9)
            : null,
        },
        city: data.name ?? "Unknown location",
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
                  onCardClick={(card) => {
                    setSelectedCard(card);
                    setActiveModal("preview");
                  }}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={(card) => {
                    setSelectedCard(card);
                    setActiveModal("preview");
                  }}
                  onAddClothes={handleOpenAddGarmentModal}
                />
              }
            />
          </Routes>
        </main>

        <Footer />

        <AddGarmentModal
          isOpen={activeModal === "add-garment"}
          onClose={() => setActiveModal("")}
          onAddGarment={(item) => setClothingItems((prev) => [item, ...prev])}
        />

        <AddItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={() => {
            setActiveModal("");
            setSelectedCard(null);
          }}
          onDelete={handleDeleteClick}
        />

        <ConfirmDeleteModal
          isOpen={activeModal === "confirm-delete"}
          onClose={() => {
            setActiveModal("");
            setItemToDelete(null);
          }}
          onConfirm={() => {
            deleteItem(itemToDelete._id)
              .then(() => {
                setClothingItems((prev) =>
                  prev.filter((item) => item._id !== itemToDelete._id)
                );
                setActiveModal("");
                setItemToDelete(null);
              })
              .catch((err) => {
                console.error("Error deleting item:", err);
              });
          }}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
