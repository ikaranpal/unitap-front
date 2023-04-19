import React, { useContext } from "react";
import Icon from "components/basic/Icon/Icon";
import { ClaimButton, LightOutlinedButtonNew } from "../../../../components/basic/Button/button";
import Modal from "../../../../components/common/Modal/modal";
import { UserProfileContext } from "../../../../hooks/useUserProfile";

const UserProfileModal = () => {
  const { userProfileModalIsOpen, closeUserProfileModal } = useContext(UserProfileContext);

  const UserProfileModalBody = () => {
    return (
      <>
        <div
          className="user-profile-modal flex flex-col items-center justify-center pt-5"
          data-testid="user-profile-modal"
        >
          <Icon
            data-testid="user-profile-image"
            className="user-profile-image !w-4/12 z-10 mb-16"
            iconSrc="assets/images/modal/user-profile-image.svg"
          />

          <input className="input w-full mb-6" placeholder="@username"/>

          <span className="user-profile-action-buttons flex gap-6 w-full mb-6">
            <button className="btn btn-small btn--social w-full">Connect <Icon iconSrc="assets/images/modal/twitter.svg" className="w-5 h-auto" /> </button>
            <button className="btn btn-small btn--social w-full">Connect <Icon iconSrc="assets/images/modal/instagram.svg" className="w-5 h-auto" /> </button>
          </span>

          <ClaimButton className="!w-full" onClick={() => {}}>
            Save
          </ClaimButton>
        </div>
      </>
    );
  };

  return (
    <Modal title="Edit Profile" size="small" closeModalHandler={closeUserProfileModal} isOpen={userProfileModalIsOpen}>
      <UserProfileModalBody />
    </Modal>
  );
};

export default UserProfileModal;
