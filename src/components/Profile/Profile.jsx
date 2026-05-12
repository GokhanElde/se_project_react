import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  clothingItems,
  onCardClick,
  onAddClothes,
  onLogout,
  onCardLike,
  onEditProfile,
}) => {
  return (
    <section className="profile">
      <SideBar onLogout={onLogout} onEditProfile={onEditProfile} />
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
