import Icon from 'components/basic/Icon/Icon';
import { useState } from 'react';
import RequirementModal from './components/RequirementModal';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ProviderDashboardButtonNext, ProviderDashboardButtonPrevious } from 'components/basic/Button/button';

import { PrizeInfoProp } from 'types';

const Requirements = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const { openRequirementModal, handleSelectSatisfy, data, page } = usePrizeOfferFormContext();
	const [showItems, setShowItems] = useState<boolean>(false);

	const onSelect = (e: string) => {
		handleSelectSatisfy(e);
		setShowItems(false);
	};

	const handleNextPage = () => {
		handleChangeFormPageNext(page);
	};
	const satisfy = { satisfySome: 'satisfySome', satisfyAll: 'satisfyAll' };
	return (
		<div className="text-gray100 text-[12px] font-medium flex flex-col gap-5 w-full  max-w-[452px] min-w-[300px]">
			<p>Add any requirements for Enrolling or leave it free.</p>
			<div className="flex relative bg-gray40 rounded-xl cursor-pointer text-white text-[14px] font-medium">
				<div
					className="flex items-center justify-between w-full h-[44px] px-4"
					onClick={() => setShowItems(!showItems)}
				>
					<p>{data.satisfy == 'satisfyAll' ? 'Should satisfy all' : 'Should satisfy some'}</p>
					<Icon iconSrc="assets/images/fund/arrow-down.png" height="8px" width="14px" />
				</div>
				{showItems && (
					<div className="text-[14px] font-medium top-12 h-[60px] p-2 justify-center left-0 flex flex-col gap-1 absolute rounded-xl w-full bg-gray40 border border-gray50 ">
						<div
							onClick={() => onSelect(satisfy.satisfyAll)}
							className="px-2 text-gray90 hover:text-white hover:bg-gray60 rounded-xl"
						>
							Should satisfy all
						</div>
						<div
							onClick={() => onSelect(satisfy.satisfySome)}
							className="px-2 text-gray90 hover:text-white hover:bg-gray60 rounded-xl"
						>
							Should satisfy some
						</div>
					</div>
				)}
			</div>

			<div
				onClick={openRequirementModal}
				className="flex cursor-pointer items-center gap-2 bg-gray40 h-[44px] rounded-xl px-4 text-white text-[12px]"
			>
				<Icon iconSrc="assets/images/provider-dashboard/add-requirement.svg" height="16px" width="16px" />
				<p>Add requirement</p>
			</div>
			<RequirementModal />

			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
				{/* {page == 5 ? (
					<ProviderDashboardGoToDashBoard className="opacity-[.3]">Go To Dashboard</ProviderDashboardGoToDashBoard>
				) : ( */}
				<div className="flex flex-col sm:flex-row w-full gap-5">
					<ProviderDashboardButtonPrevious
						disabled={page == 0 ? true : false}
						className="w-full"
						onClick={() => handleChangeFormPagePrev(page)}
					>
						Previous
					</ProviderDashboardButtonPrevious>
					<ProviderDashboardButtonNext onClick={handleNextPage}>NEXT</ProviderDashboardButtonNext>
				</div>
			</div>
		</div>
	);
};

export default Requirements;
