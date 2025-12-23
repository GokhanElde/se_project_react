import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/Avatar.svg";

const Header = ({ onAddClothes, city }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="WTWR logo" className="header__logo" />
        <p className="header__date-and-location">
          {currentDate}, {city || "New York"}
        </p>
      </div>

      <div className="header__right">
        <div className="header__actions">
          <button
            type="button"
            className="header__add-clothes-button"
            onClick={onAddClothes}
          >
            + Add clothes
          </button>
          <span className="header__username">Gokhan Eldeleklioglu</span>
        </div>

        <img src={avatar} alt="User avatar" className="header__avatar" />
      </div>
    </header>
  );
};

export default Header;
