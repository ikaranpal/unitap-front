import Icon from 'components/basic/Icon/Icon';
import RequirementModal from './components/RequirementModal';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { PrizeInfoProp } from 'types';
import NewAddedRequirements from '../../NewAddedRequirements';
import Pagination from '../../PagInation';
import SelectSatisfyDropdown from './components/SelectSatisfyDropdown';

export const RequirementDescription = {
	id: 2,
	prevIcon: 'assets/images/provider-dashboard/step-2-green.svg',
	activeIcon: 'assets/images/provider-dashboard/step-2-active.svg',
	nextIcon: 'assets/images/provider-dashboard/step-2-off.svg',
	title: 'Requirements',
	description: 'Add requirements for Enrollment',
};

const Requirements = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const { openRequirementModal, page, requirementList } = usePrizeOfferFormContext();

	return (
		<div className="text-gray100 text-[12px] font-medium flex flex-col w-full  max-w-[452px] min-w-[300px] select-not">
			<p>Add any requirements for Enrolling or leave it free.</p>

			<SelectSatisfyDropdown />
			{requirementList.map((requirement, key) => (
				<NewAddedRequirements key={key} label={requirement.type} />
			))}
			<div
				onClick={openRequirementModal}
				className=" flex cursor-pointer items-center gap-2 bg-gray40 h-[44px] rounded-xl px-4 text-white text-[12px]"
			>
				<Icon iconSrc="assets/images/provider-dashboard/add-requirement.svg" height="16px" width="16px" />
				<p>Add requirement</p>
			</div>

			<RequirementModal />

			<Pagination
				handleChangeFormPagePrev={handleChangeFormPagePrev}
				handleNextPage={handleChangeFormPageNext}
				page={page}
			/>
		</div>
	);
};

export default Requirements;
