import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddGarmentModal.css";
import { addItem } from "../../utils/api";

const AddGarmentModal = ({ isOpen, onClose, onAddGarment }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ name, imageUrl, weather })
      .then((newItem) => {
        onAddGarment(newItem);
        setName("");
        setImageUrl("");
        setWeather("");
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
        className="modal__input"
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label className="modal__label" htmlFor="garment-image">
        Image
      </label>
      <input
        id="garment-image"
        className="modal__input"
        type="url"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        required
      />
      <p className="modal__label">Select the weather type:</p>
      <div className="modal__radio-group">
        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="hot"
            checked={weather === "hot"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Hot
        </label>

        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="warm"
            checked={weather === "warm"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Warm
        </label>

        <label className="modal__radio">
          <input
            type="radio"
            name="weather"
            value="cold"
            checked={weather === "cold"}
            onChange={(e) => setWeather(e.target.value)}
          />
          Cold
        </label>
      </div>
    </ModalWithForm>
  );
};

export default AddGarmentModal;
