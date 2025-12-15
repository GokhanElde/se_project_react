const ItemCard = ({ item, onCardClick }) => {
  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <img src={item.link} alt={item.name} className="card__image" />
      <div className="card__info">
        <p className="card__title">{item.name}</p>
      </div>
    </li>
  );
};

export default ItemCard;
