import "./ItemModal.css";
import closeIcon from "../../assets/close.svg";

const ItemModal = ({ card, isOpen, onClose, onDelete }) => {
  if (!isOpen || !card) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) onClose();
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__footer">
          <div className="title">
            <h2 className="modal__title">{card.name}</h2>
            <button
              type="button"
              className="modal__delete"
              onClick={() => onDelete(card)}
            >
              Delete item
            </button>
          </div>
          <div className="weather">
            <h2 className="modal__title">Weather: {card.weather}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;
