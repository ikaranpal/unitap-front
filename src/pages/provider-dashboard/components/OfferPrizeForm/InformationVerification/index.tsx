import Icon from 'components/basic/Icon/Icon';
import { ProviderDashboardGoToDashBoard } from 'components/basic/Button/button';
import { usePrizeOfferFormContext } from 'hooks/usePrizeOfferFormContext';
import { ProviderFormPaginationProp } from 'types';

export const InformationVerificationDes = {
	id: 5,
	prevIcon: 'assets/images/provider-dashboard/step-5-active.svg',
	activeIcon: 'assets/images/provider-dashboard/step-5-active.svg',
	nextIcon: 'assets/images/provider-dashboard/step-5-off.svg',
	title: 'Verification',
	description: 'Processing your request',
};

const InformationVerification = () => {
	const { handleGOToDashboard } = usePrizeOfferFormContext();
	return (
		<div className="flex flex-col gap-5 w-full max-w-[452px] text-gray100 font-medium text-[12px] text-center animate-fadeIn">
			<Icon iconSrc="assets/images/provider-dashboard/diamond.png" />
			<div className="flex items-center text-[14px] justify-center text-white font-semibold gap-2 justify-center">
				<p>Validating</p>
				<Icon className="ml-[-3px]" iconSrc="assets/images/provider-dashboard/loading.svg" width="20px" height="4px" />
			</div>
			<p>Your request has been sent . thank you for your patience while we validate your request.</p>
			<div className="bg-gray50 p-4 rounded-[12px] leading-5 relative">
				<div className="flex flex-col md:flex-row items-center justify-center">
					<Icon
						className="ml-[-5px] mr-[5px]"
						width="12px"
						height="12px"
						iconSrc="assets/images/provider-dashboard/exclamationMark.svg"
					/>
					<p>It usually takes around 1 week for us to validate your request. If you</p>
				</div>
				<p>haven't heard from us by then, we encourage you to contact us via this email address:</p>
				<p className="text-white">unitap.support@gmail.com</p>
			</div>
			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center gap-5">
				<ProviderDashboardGoToDashBoard onClick={handleGOToDashboard} className="opacity-[.2]">
					Go To Dashboard
				</ProviderDashboardGoToDashBoard>
			</div>
		</div>
	);
};

export default InformationVerification;
