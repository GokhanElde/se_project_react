import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const SideBar = ({ onLogout, onEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser?.name || "User";
  const avatar = currentUser?.avatar;

  return (
    <aside className="sidebar">
      <div className="sidebar__user-info">
        {avatar ? (
          <img src={avatar} alt="Avatar" className="sidebar__avatar" />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {userName.charAt(0).toUpperCase()}
          </div>
        )}

        <p className="sidebar__username">{userName}</p>
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
