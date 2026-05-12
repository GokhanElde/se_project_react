import { useEffect } from "react";
import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  submitDisabled = false,
}) => {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`modal modal_is-opened modal_type_${name}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <button className="modal__close" onClick={onClose} type="button">
          ✕
        </button>

        <h2 className="modal_with_form__title">{title}</h2>

        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={submitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
