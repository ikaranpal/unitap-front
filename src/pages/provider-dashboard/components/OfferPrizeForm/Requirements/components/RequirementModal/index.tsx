import { useMemo } from 'react';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import Modal from 'components/common/Modal/modal';
import RenderNftRequirement from '../RenderNftRequirement';
import RenderBrightIdRequirement from '../RenderBrightIdRequirement';
import RenderInitialBody from '../RenderInitialBody';

const getModal = (index: number) => [RenderNftRequirement, RenderBrightIdRequirement][index];

const RequirementModalBody = () => {
	const { requirementModalItems } = usePrizeOfferFormContext();

	const getRequirementModalBody = () => {
		const index = requirementModalItems.findIndex((item) => item.isOpen);
		if (index >= 0) {
			const ReqModal = getModal(index);
			return <ReqModal label={requirementModalItems[index].label} />;
		} else {
			return <RenderInitialBody />;
		}
	};
	return <div className="claim-modal-wrapper flex flex-col max-h-[550px] pt-5">{getRequirementModalBody()}</div>;
};

const RequirementModal = () => {
	const { closeRequirementModal, isModalOpen, requirementTitle } = usePrizeOfferFormContext();

	const isOpen = useMemo(() => {
		return isModalOpen;
	}, [isModalOpen]);

	return (
		<>
			<Modal
				title={`${requirementTitle ? 'Add ' + requirementTitle + ' requirement' : 'Add requirement'}`}
				size="small"
				closeModalHandler={closeRequirementModal}
				isOpen={isOpen}
			>
				<RequirementModalBody />
			</Modal>
		</>
	);
};

export default RequirementModal;
