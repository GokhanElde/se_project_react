import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ClothesSection = ({
  clothingItems,
  onCardClick,
  openAddClothes,
  onCardLike,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) =>
      item.owner === currentUser?._id || item.owner?._id === currentUser?._id,
  );
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add-new"
          onClick={() => {
            if (!openAddClothes) {
              return console.error("openAddClothes is not defined");
            }
            openAddClothes();
          }}
        >
          + Add new
        </button>
      </div>

      <ul className="cards">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </section>
  );
};

export default ClothesSection;
