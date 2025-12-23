import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""} modal_type_${name}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} type="button">
          ✕
        </button>

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
