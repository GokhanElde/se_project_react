import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddGarmentModal.css";
import { useForm } from "../../hooks/useForm";
import { useEffect } from "react";

const AddGarmentModal = ({ isOpen, onClose, onAddGarment }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddGarment(values)
      .then(() => {
        resetForm();
        onClose();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="garment-name">
        Name
      </label>
      <input
        id="garment-name"
        name="name"
        className="modal__input"
        type="text"
        placeholder="Name"
        value={values.name}
        onChange={handleChange}
        required
      />

      <label className="modal__label" htmlFor="garment-image">
        Image
      </label>
      <input
        id="garment-image"
        name="imageUrl"
        className="modal__input"
        type="url"
        placeholder="Image URL"
        value={values.imageUrl}
        onChange={handleChange}
        required
      />

      <p className="modal__label">Select the weather type:</p>
      <div className="modal__radio-group">
        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          Hot
        </label>

        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          Warm
        </label>

        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
};

export default AddGarmentModal;
