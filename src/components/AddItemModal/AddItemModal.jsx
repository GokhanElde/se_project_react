import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onClose, onAddGarment }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddGarment(values).then(() => {
      resetForm();
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-item"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input
          name="name"
          className="modal__input"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Image
        <input
          name="imageUrl"
          className="modal__input"
          type="url"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <p className="modal__label">Select the weather type:</p>

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
    </ModalWithForm>
  );
};

export default AddItemModal;
