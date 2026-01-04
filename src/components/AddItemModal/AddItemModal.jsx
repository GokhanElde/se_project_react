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
      submitDisabled={!(values.name && values.imageUrl && values.weather)}
    >
      <label className="add_item_modal__label">
        Name
        <input
          name="name"
          placeholder="Name"
          className="add_item_modal__input"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="add_item_modal__label">
        Image
        <input
          name="imageUrl"
          placeholder="Image URL"
          className="add_item_modal__input"
          type="url"
          value={values.imageUrl}
          onChange={handleChange}
          required
        />
      </label>

      <p className="add_item_modal__label">Select the weather type:</p>

      <label className="add_item_modal__radio">
        <input
          type="radio"
          name="weather"
          value="hot"
          checked={values.weather === "hot"}
          onChange={handleChange}
        />
        Hot
      </label>

      <label className="add_item_modal__radio">
        <input
          type="radio"
          name="weather"
          value="warm"
          checked={values.weather === "warm"}
          onChange={handleChange}
        />
        Warm
      </label>

      <label className="add_item_modal__radio">
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
