import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ onLogout, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser?.avatar || ""}
          alt="Avatar"
          className="sidebar__avatar"
        />

        <p className="sidebar__username">{currentUser?.name || "User"}</p>
      </div>

      <button
        type="button"
        className="sidebar__edit-profile"
        onClick={onEditProfile}
      >
        Change profile data
      </button>

      <button type="button" className="sidebar__logout" onClick={onLogout}>
        Log out
      </button>
    </aside>
  );
};

export default SideBar;
