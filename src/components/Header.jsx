const Header = ({ onAddClothes }) => {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <div className="header__logo">WTWR</div>
        <p className="header__date-and-location">{currentDate} • Boston, MA</p>
      </div>

      <div className="header__right">
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
