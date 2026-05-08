import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onClose, onRegister }) => {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(values)
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        console.error("Failed to register:", err);
      });
  };

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitDisabled={
        !(values.name && values.avatar && values.email && values.password)
      }
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
        Avatar URL
        <input
          name="avatar"
          placeholder="Avatar URL"
          className="add_item_modal__input"
          type="url"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>

      <label className="add_item_modal__label">
        Email
        <input
          name="email"
          placeholder="Email"
          className="add_item_modal__input"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="add_item_modal__label">
        Password
        <input
          name="password"
          placeholder="Password"
          className="add_item_modal__input"
          type="password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
