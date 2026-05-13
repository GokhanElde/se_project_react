import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onClose, onRegister, onSwitchToLogin }) => {
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
      title="Sign Up"
      name="register"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      onSubmit={handleSubmit}
      submitDisabled={
        !(values.name && values.avatar && values.email && values.password)
      }
      secondaryButtonText="Log In"
      onSecondaryClick={onSwitchToLogin}
    >
      <label className="modal__label">
        Email*
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
        Password*
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

      <label className="modal__label">
        Name*
        <input
          name="name"
          placeholder="Name"
          className="modal__input"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          name="avatar"
          placeholder="Avatar URL"
          className="modal__input"
          type="url"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
