import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const Header = ({ onAddClothes, onLogin, onRegister, city, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <img src={logo} alt="WTWR logo" className="header__logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {city || "New York"}
        </p>
      </div>

      <div className="header__right">
        <div className="header__actions">
          <ToggleSwitch />

          {isLoggedIn ? (
            <>
              <button
                type="button"
                className="header__add-clothes-button"
                onClick={onAddClothes}
              >
                + Add clothes
              </button>

              <Link to="/profile" className="header__profile-link">
                <span className="header__username">
                  {currentUser?.name || "User"}
                </span>
                <img
                  src={currentUser?.avatar || ""}
                  alt="User avatar"
                  className="header__avatar"
                />
              </Link>
            </>
          ) : (
            <>
              <button
                type="button"
                className="header__auth-button"
                onClick={onRegister}
              >
                Sign Up
              </button>

              <button
                type="button"
                className="header__auth-button"
                onClick={onLogin}
              >
                Log In
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
