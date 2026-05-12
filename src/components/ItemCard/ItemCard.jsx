import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onCardClick, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const isLiked = item.likes?.some((like) => {
    return like === currentUser?._id || like._id === currentUser?._id;
  });
  const handleLikeClick = (e) => {
    e.stopPropagation();
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item-card" onClick={() => onCardClick(item)}>
      <div className="item-card__header">
        <p className="item-card__title">{item.name}</p>
        {currentUser && (
          <button
            type="button"
            className={`item-card__like-button ${
              isLiked ? "item-card__like-button_active" : ""
            }`}
            onClick={handleLikeClick}
          />
        )}
      </div>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
    </li>
  );
};

export default ItemCard;
