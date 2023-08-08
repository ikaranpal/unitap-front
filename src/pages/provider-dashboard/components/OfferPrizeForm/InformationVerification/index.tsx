import Icon from 'components/basic/Icon/Icon';
import React from 'react';

const InformationVerification = () => {
	return (
		<div className="flex flex-col gap-5 w-full max-w-[452px] min-w-[300px] text-gray100 font-medium text-[12px] text-center">
			<Icon iconSrc="assets/images/provider-dashboard/diamond.svg" />
			<div className="flex items-center text-[14px] text-white font-semibold gap-2 justify-center">
				<p>Validating</p>
				<Icon iconSrc="assets/images/provider-dashboard/warn-loading.svg" />
			</div>
			<p>
				Your request has been sent . thank you for your patience while we validate your request. you can cancel your
				request any time.
			</p>
			<p>if validating your request took longer than 1 week , you can contact us using the following email address</p>
			<p>hehe@gmail.com</p>
		</div>
	);
};

export default InformationVerification;
