import Icon from 'components/basic/Icon/Icon';
import { PrizeInfoDescription } from '../PrizeInfo';

const displaySteps = [
	PrizeInfoDescription,
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
		title: 'Social Media  & Contact Info',
		description: 'Add your contact info & Social Media ',
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

const DisplaySteps = (page: number) => {
	return (
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
	);
};

export default DisplaySteps;
