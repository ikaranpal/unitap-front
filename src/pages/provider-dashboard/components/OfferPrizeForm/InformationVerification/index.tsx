import Icon from 'components/basic/Icon/Icon';
import { ProviderDashboardButtonPrevious, ProviderDashboardGoToDashBoard } from 'components/basic/Button/button';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { PrizeInfoProp } from 'types';

export const InformationVerificationDes = {
	id: 5,
	prevIcon: 'assets/images/provider-dashboard/step-5-active.svg',
	activeIcon: 'assets/images/provider-dashboard/step-5-active.svg',
	nextIcon: 'assets/images/provider-dashboard/step-5-off.svg',
	title: 'Information Verification',
	description: 'Processing your request',
};

const InformationVerification = ({ handleChangeFormPagePrev }: PrizeInfoProp) => {
	const { page, handleGOToDashboard } = usePrizeOfferFormContext();
	return (
		<div className="flex flex-col gap-5 w-full max-w-[452px] min-w-[300px] text-gray100 font-medium text-[12px] text-center">
			<Icon iconSrc="assets/images/provider-dashboard/diamond.svg" />
			<div className="flex items-center text-[14px] text-white font-semibold gap-2 justify-center">
				<p>Validating</p>
				<Icon iconSrc="assets/images/provider-dashboard/warn-loading.svg" />
			</div>
			<p>Your request has been sent . thank you for your patience while we validate your request.</p>
			<div>
				<p>
					It usually takes around 1 week for us to validate your request. If you haven't heard from us by then, we
					encourage you to contact us via this email address:
				</p>
				<p className="text-white">unitap.support@gmail.com</p>
			</div>
			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center gap-5">
				<div className="flex flex-col sm:flex-row w-full gap-5">
					<ProviderDashboardButtonPrevious
						disabled={page == 0 ? true : false}
						className="w-full"
						onClick={() => handleChangeFormPagePrev(page)}
					>
						Previous
					</ProviderDashboardButtonPrevious>
				</div>
				<ProviderDashboardGoToDashBoard onClick={handleGOToDashboard} className="opacity-[.3]">
					Go To Dashboard
				</ProviderDashboardGoToDashBoard>
			</div>
		</div>
	);
};

export default InformationVerification;
