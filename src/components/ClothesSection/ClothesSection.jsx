import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

const ClothesSection = ({ clothingItems, onCardClick, onAddClothes }) => {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add-new"
          onClick={() => {
            if (!onAddClothes) {
              return console.error("onAddClothes is not defined");
            }
            onAddClothes();
          }}
        >
          + Add new
        </button>
      </div>

      <ul className="cards">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
};

export default ClothesSection;
