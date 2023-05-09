import React, {useContext, useEffect, useState} from "react";
import Icon from "components/basic/Icon/Icon";
import {ClaimButton} from "../../../../components/basic/Button/button";
import Modal from "../../../../components/common/Modal/modal";
import {UserProfileContext} from "../../../../hooks/useUserProfile";
import {APIError, APIErrorsSource} from "../../../../types";
import {ErrorsMessagesContext} from "../../../../context/ErrorsMessagesProvider";

const UserProfileModalBody = () => {
	const [usernameInput, setUsernameInput] = useState('');
	const [usernameError, setUsernameError] = useState<APIError | null>(null);
	const [usernameMessage, setUsernameMessage] = useState<APIError | null>(null);
	const {errors, getError, deleteError, messages, getMessage, deleteMessage} = useContext(ErrorsMessagesContext);
	const {checkUsername, setUsername} = useContext(UserProfileContext);
	const [checkUsernameTimeout, setCheckUsernameTimeout] = useState<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setUsernameError(getError(APIErrorsSource.USER_PROFILE_ERROR));
	}, [errors, getError]);

	useEffect(() => {
		setUsernameMessage(getMessage(APIErrorsSource.USER_PROFILE_ERROR));
	}, [messages, getMessage]);

	const setUsernameInputHandler = async (username: string) => {
		if (!checkUsername) return;
		setUsernameInput(username);
		deleteError(APIErrorsSource.USER_PROFILE_ERROR);
		deleteMessage(APIErrorsSource.USER_PROFILE_ERROR);

		if (checkUsernameTimeout) {
			clearTimeout(checkUsernameTimeout);
		}

		setCheckUsernameTimeout(
			setTimeout(async () => {
				if (username) {
					await checkUsername(username);
				}
			}, 1000)
		);
	}

	const handleSaveUsernamePressed = () => {
		if (!usernameInput) return;
		setUsername(usernameInput);
	}

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

				<input type='text' className="input w-full mb-2" placeholder="@username"
				       onChange={(event) => setUsernameInputHandler(event.target.value)}/>
				{usernameError && (
					<span className="notice flex mb-3 w-full">
		        <p className="text-xs text-error font-light ml-1"> {usernameError.message} </p>
		      </span>
				)}
				{usernameMessage && !usernameError && (
					<span className="notice flex mb-3 w-full">
						<p className="text-xs text-space-green font-light ml-1"> {usernameMessage.message} </p>
					</span>
				)}

				{/*<span className="user-profile-action-buttons flex gap-6 w-full mb-6">*/}
				{/*  <button className="btn btn-small btn--social w-full">Connect*/}
				{/*    <Icon iconSrc="assets/images/modal/twitter.svg" className="w-5 h-auto" />*/}
				{/*  </button>*/}
				{/*  <button className="btn btn-small btn--social w-full">Connect*/}
				{/*    <Icon iconSrc="assets/images/modal/instagram.svg" className="w-5 h-auto" />*/}
				{/*  </button>*/}
				{/*</span>*/}
				<ClaimButton className="!w-full mt-3" onClick={() => handleSaveUsernamePressed()}
				             disabled={!!getError(APIErrorsSource.USER_PROFILE_ERROR) || !getMessage(APIErrorsSource.USER_PROFILE_ERROR)}>
					Save
				</ClaimButton>
			</div>
		</>
	)
		;
};

const UserProfileModal = () => {
	const {isUserProfileModalOpen, setIsUserProfileModalOpenState} = useContext(UserProfileContext);

	return (
		<Modal
			title="Edit Profile"
			size="small"
			closeModalHandler={() => setIsUserProfileModalOpenState(false)}
			isOpen={isUserProfileModalOpen}
			errorSource={APIErrorsSource.USER_PROFILE_ERROR}
		>
			<UserProfileModalBody/>
		</Modal>
	);
};

export default UserProfileModal;
