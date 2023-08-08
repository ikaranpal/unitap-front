import Icon from 'components/basic/Icon/Icon';

import {
	ProviderDashboardButtonNext,
	ProviderDashboardButtonPrevious,
	ProviderDashboardButtonSubmit,
	ProviderDashboardGoToDashBoard,
} from 'components/basic/Button/button';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import PrizeInfo from './PrizeInfo';
import TimeEnrollLimitation from './TimeEnrollLimitation';
import Requirements from './Reuirements';
import ContactInformation from './ContactInformation';
import DepositPrize from './DepositPrize';
import InformationVerification from './InformationVerification';

const OfferPrizeForm = () => {
	const { page, setPage } = usePrizeOfferFormContext();
	interface Display {
		[key: number]: JSX.Element;
	}
	const handleChangeFormPageNext = () => {
		if (page >= 5) return;
		setPage(page + 1);
	};

	const handleChangeFormPagePrev = () => {
		if (page <= 0) return;
		setPage(page - 1);
	};

	const display: Display = {
		0: <PrizeInfo />,
		1: <TimeEnrollLimitation />,
		2: <Requirements />,
		3: <ContactInformation />,
		4: <DepositPrize />,
		5: <InformationVerification />,
	};

	const displaySteps = [
		{
			id: 0,
			prevIcon: 'assets/images/provider-dashboard/prizerForm-step-diamond-green.svg',
			activeIcon: 'assets/images/provider-dashboard/prizeForm-step-diamond.svg',
			nextIcon: 'assets/images/provider-dashboard/prizeForm-step-diamond.svg',
			title: 'Prize info',
			description: 'Your prize information',
		},
		{
			id: 1,
			prevIcon: 'assets/images/provider-dashboard/step-1-green.svg',
			activeIcon: 'assets/images/provider-dashboard/step-1-active.svg',
			nextIcon: 'assets/images/provider-dashboard/step-1-off.svg',
			title: 'Time/Enrollment Limitation',
			description: 'Information of time and enrollment ',
		},
		{
			id: 2,
			prevIcon: 'assets/images/provider-dashboard/step-2-green.svg',
			activeIcon: 'assets/images/provider-dashboard/step-2-active.svg',
			nextIcon: 'assets/images/provider-dashboard/step-2-off.svg',
			title: 'Requirements',
			description: 'Add requirements for Enrollment',
		},
		{
			id: 3,
			prevIcon: 'assets/images/provider-dashboard/step-3-green.svg',
			activeIcon: 'assets/images/provider-dashboard/step-3-active.svg',
			nextIcon: 'assets/images/provider-dashboard/step-3-off.svg',
			title: 'Contact Information',
			description: 'Username of discord & twitter & ...',
		},
		{
			id: 4,
			prevIcon: 'assets/images/provider-dashboard/step-4-green.svg',
			activeIcon: 'assets/images/provider-dashboard/step-4-active.svg',
			nextIcon: 'assets/images/provider-dashboard/step-4-off.svg',
			title: 'Deposit Prize',
			description: 'Deposit Token or Nft',
		},
		{
			id: 5,
			prevIcon: 'assets/images/provider-dashboard/step-5-active.svg',
			activeIcon: 'assets/images/provider-dashboard/step-5-active.svg',
			nextIcon: 'assets/images/provider-dashboard/step-5-off.svg',
			title: 'Information Verification',
			description: 'Processing your request',
		},
	];

	return (
		<div className="flex flex-col md:flex-row gap-5">
			<div className="offerPrize-Steps w-full md:max-w-[362px] py-[4em] px-10 flex flex-col gap-8">
				{displaySteps.map((item, index) => (
					<div className="flex items-center gap-3 relative text-[12px] text-white" key={index}>
						<div className="prizeForm-current-step-icon z-[999]">
							<Icon iconSrc={index == page ? item.activeIcon : index > page ? item.nextIcon : item.prevIcon} />{' '}
						</div>
						<div
							className={`${
								index == page ? 'text-white' : index > page ? 'opacity-[.4]' : 'text-[#4CE6A1] opacity-[.4]'
							} `}
						>
							<p className={`font-semibold`}>{item.title}</p>{' '}
							<p className={`${index >= page ? 'text-gray100' : 'text-[#4CE6A1]'}`}>{item.description}</p>
						</div>
						{index < 5 && (
							<div
								className={`absolute w-[2px] left-3 top-7 bottom-[-3.4em] ${
									index < page ? 'bg-[#274641]' : 'bg-gray70'
								}  top-0`}
							></div>
						)}
					</div>
				))}
			</div>
			<div className="offerPrize-form bg-gray20 w-full rounded-xl py-[4em] min-h-[504px] flex flex-col items-center px-5">
				<div className="w-full flex  justify-center min-h-[320px]">{display[page]}</div>
				<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
					{page == 5 ? (
						<ProviderDashboardGoToDashBoard className="opacity-[.3]">Go To Dashboard</ProviderDashboardGoToDashBoard>
					) : (
						<div className="flex flex-col sm:flex-row w-full gap-5">
							<ProviderDashboardButtonPrevious
								disabled={page == 0 ? true : false}
								className="w-full"
								onClick={handleChangeFormPagePrev}
							>
								Previous
							</ProviderDashboardButtonPrevious>
							{page == 4 ? (
								<ProviderDashboardButtonSubmit className="text-[14px] md:text-[12px] lg:text-[14px] ">
									<p>Submit Contribution</p>
								</ProviderDashboardButtonSubmit>
							) : (
								<ProviderDashboardButtonNext onClick={handleChangeFormPageNext}>NEXT</ProviderDashboardButtonNext>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default OfferPrizeForm;
