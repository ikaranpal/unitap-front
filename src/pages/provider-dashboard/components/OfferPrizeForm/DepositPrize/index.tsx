import Icon from 'components/basic/Icon/Icon';
import React from 'react';

const DepositPrize = () => {
	return (
		<div className="flex flex-col gap-5 w-full max-w-[452px] min-w-[300px]">
			<Icon iconSrc="assets/images/provider-dashboard/Subtract.svg" className="mb-5" />
			<div className="text-center">
				<p className="text-[14px] font-semibold text-white">Deposit Selected NFT</p>
				<p className="text-gray100 text-[12px] mt-2">
					Please proceed with depositing the NFT for which you have completed the corresponding form. Please wait
					momentarily as we validate your request. In the event of rejection, the token will promptly returned to your
					designated wallet.
				</p>
			</div>
			<div className="flex items-center gap-2 text-white font-semibold">
				<p>Show preview</p>
				<Icon iconSrc="assets/images/provider-dashboard/ic_link_white.svg" />
			</div>
			<div className="flex w-full gap-5 text-white h-[48px] text-[14px] mt-[-12px] ">
				<div className="cursor-pointer gap-2 w-full flex items-center justify-center bg-gray50 rounded-xl">
					<Icon iconSrc="assets/images/provider-dashboard/Telos.svg" />
					<p>Telos</p>
				</div>
				<div className="cursor-pointer gap-2 w-full flex items-center justify-center bg-gray50 rounded-xl">
					<Icon iconSrc="assets/images/provider-dashboard/kolahGhermezi.svg" />
					<p>Kolah Qermezi</p>
				</div>
			</div>
		</div>
	);
};

export default DepositPrize;
