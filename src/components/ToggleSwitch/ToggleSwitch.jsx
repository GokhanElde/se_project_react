import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import "./ToggleSwitch.css";

const ToggleSwitch = () => {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle__slider"></span>
      <span
        className={`toggle__label ${
          currentTemperatureUnit === "F" ? "toggle__label_active" : ""
        }`}
      >
        F
      </span>
      <span
        className={`toggle__label ${
          currentTemperatureUnit === "C" ? "toggle__label_active" : ""
        }`}
      >
        C
      </span>
    </label>
  );
};

export default ToggleSwitch;
