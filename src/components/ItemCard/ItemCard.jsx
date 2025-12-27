import "./ItemCard.css";

const ItemCard = ({ item, onCardClick }) => {
  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <p className="item-card__title">{item.name}</p>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
    </li>
  );
};

export default ItemCard;
