import "./ItemModal.css";

const ItemModal = ({ card, isOpen, onClose }) => {
  if (!card) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button className="modal__close" onClick={onClose}>
          ✕
        </button>

        <img src={card.link} alt={card.name} className="modal__image" />

        <h2 className="modal__title">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
      </div>
    </div>
  );
};

export default ItemModal;
