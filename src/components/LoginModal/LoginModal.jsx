import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
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
      title="Log In"
      name="login"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      onSubmit={handleSubmit}
      submitDisabled={!(values.email && values.password)}
      secondaryButtonText="Sign Up"
      onSecondaryClick={onSwitchToRegister}
    >
      <label className="modal__label">
        Email
        <input
          name="email"
          placeholder="Email"
          className="modal__input"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          name="password"
          placeholder="Password"
          className="modal__input"
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
