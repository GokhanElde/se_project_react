import avatar from "../../assets/Avatar.svg";
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ onLogout }) => {
  const currentUser = useContext(CurrentUserContext);
  return (
    <aside className="sidebar">
      <img src={avatar} alt="Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">{currentUser?.name || "User"}</p>{" "}
      <button className="sidebar__logout" onClick={onLogout}>
        Logout
      </button>
    </aside>
  );
};
export default SideBar;
