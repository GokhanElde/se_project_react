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
}) => {
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
    <div className={`modal modal_is-opened modal_type_${name}`}>
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
