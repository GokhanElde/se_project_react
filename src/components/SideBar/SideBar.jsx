import avatar from "../../assets/Avatar.svg";
import "./SideBar.css";

const SideBar = () => {
  return (
    <aside className="sidebar">
      <img src={avatar} alt="Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">Gokhan Eldeleklioglu</p>
    </aside>
  );
};
export default SideBar;
