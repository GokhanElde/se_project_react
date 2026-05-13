import { useEffect } from "react";
import "./ConfirmDeleteModal.css";
import closeIcon from "../../assets/close.svg";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal modal_type_confirm" onClick={onClose}>
      <div
        className="modal__content modal__content_type_confirm"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <p className="modal__title modal__title_type_confirm">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </p>

        <div className="modal__actions modal__actions_type_confirm">
          <button type="button" className="modal__confirm" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button type="button" className="modal__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
