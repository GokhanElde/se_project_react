import { useState } from "react";
import "./Header.css";

const Header = ({ onAddClothes, city }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">WTWR</div>
        <p className="header__date-and-location">
          {currentDate} • {city || "Unknown location"}
        </p>
      </div>

      <button className="header__menu-button" onClick={toggleMobileMenu}>
        ☰
      </button>

      <div
        className={`header__right ${
          isMobileMenuOpened ? "header__right_opened" : ""
        }`}
      >
        <button className="header__add-clothes-button" onClick={onAddClothes}>
          + Add clothes
        </button>

        <div className="header__user">
          <span className="header__username">Gokhan</span>
          <div className="header__avatar"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
