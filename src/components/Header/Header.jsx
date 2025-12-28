import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

const Header = ({ onAddClothes, city }) => {
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
          <button
            type="button"
            className="header__add-clothes-button"
            onClick={onAddClothes}
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__profile-link">
            <span className="header__username">Gokhan Eldeleklioglu</span>
            <img src={avatar} alt="User avatar" className="header__avatar" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
