import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const ItemModal = ({ card, isOpen, onClose, onDelete }) => {
  const currentUser = useContext(CurrentUserContext);
  if (!isOpen || !card) return null;

  const isOwn =
    card.owner === currentUser?._id || card.owner?._id === currentUser?._id;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) onClose();
  };

  return (
    <div
      className={`modal modal_type_preview ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="title">
            <h2 className="modal__title modal__title_type_preview">
              {card.name}
            </h2>
            {isOwn && (
              <button
                type="button"
                className="modal__delete"
                onClick={() => onDelete(card)}
              >
                Delete item
              </button>
            )}
          </div>
          <div className="weather_text">
            <h2 className="modal__title modal__title_type_preview">
              Weather: {card.weather}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
