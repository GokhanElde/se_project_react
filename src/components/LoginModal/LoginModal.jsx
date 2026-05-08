import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin(values)
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        console.error("Failed to login:", err);
      });
  };

  return (
    <ModalWithForm
      title="Login"
      name="login"
      buttonText="Login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      submitDisabled={!(values.email && values.password)}
    >
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

export default LoginModal;
