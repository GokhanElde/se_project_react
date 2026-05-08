import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import AddItemModal from "./AddItemModal/AddItemModal.jsx";
import ItemModal from "./ItemModal/ItemModal.jsx";
import Profile from "./Profile/Profile.jsx";
import ConfirmDeleteModal from "./ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import LoginModal from "./LoginModal/LoginModal.jsx";
import RegisterModal from "./RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext";

import * as auth from "../utils/auth.js";

import { getWeather } from "../utils/weatherApi.js";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../utils/api";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import "../App.css";

function App() {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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

  const handleOpenLoginModal = () => {
    setActiveModal("login");
  };

  const handleOpenRegisterModal = () => {
    setActiveModal("register");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setActiveModal("confirm-delete");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const apiRequest = isLiked
      ? removeCardLike(id, token)
      : addCardLike(id, token);
    apiRequest
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) =>
            item._id === updatedCard._id ? updatedCard : item,
          ),
        );
      })
      .catch((err) => {
        console.error("Failed to update like status:", err);
      });
  };

  const handleAddItem = (data) => {
    const token = localStorage.getItem("jwt");

    return addItem(data, token)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  const handleLogin = (data) => {
    return auth
      .signin(data)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return auth.checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        closeAllModals();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleRegister = (data) => {
    return auth
      .signup(data)
      .then(() => {
        return handleLogin(data);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleConfirmDelete = () => {
    const token = localStorage.getItem("jwt");

    return deleteItem(itemToDelete._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== itemToDelete._id),
        );
        closeAllModals();
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
  };

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeatherData({
          temperature: {
            F: data.main.temp,
            C: Math.round(((data.main.temp - 32) * 5) / 9),
          },
          city: data.name,
        });
      })
      .catch((err) => {
        console.error("Failed to fetch weather:", err);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then(setClothingItems)
      .catch((err) => {
        console.error("Failed to fetch items:", err);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <Header
            city={weatherData.city}
            onAddClothes={handleOpenAddItemModal}
            onLogin={handleOpenLoginModal}
            onRegister={handleOpenRegisterModal}
            isLoggedIn={isLoggedIn}
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
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onAddClothes={handleOpenAddItemModal}
                      onLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
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

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeAllModals}
            onLogin={handleLogin}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeAllModals}
            onRegister={handleRegister}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
