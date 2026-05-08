import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  clothingItems,
  onCardClick,
  onAddClothes,
  onLogout,
  onCardLike,
}) => {
  return (
    <section className="profile">
      <SideBar onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        openAddClothes={onAddClothes}
        onCardLike={onCardLike}
      />
    </section>
  );
};

export default Profile;
