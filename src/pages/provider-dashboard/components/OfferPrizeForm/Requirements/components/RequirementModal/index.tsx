import { useMemo } from 'react';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import Modal from 'components/common/Modal/modal';
import RenderInitialBody from '../RenderInitialBody';
import ConstraintModal from '../ConstraintModal';

const RequirementModalBody = () => {
	const { selectedConstrains } = usePrizeOfferFormContext();

	const getRequirementModalBody = () => {
		if (selectedConstrains) {
			// const modal = selectedConstrains.title;
			// if (index >= 0) {
			// const ReqModal = getModal(selectedConstrains);
			return <ConstraintModal constraint={selectedConstrains} />;
		} else {
			return <RenderInitialBody />;
		}
	};
	return <div className="claim-modal-wrapper flex flex-col max-h-[550px] pt-5">{getRequirementModalBody()}</div>;
};

const RequirementModal = () => {
	const { closeRequirementModal, isModalOpen, selectedConstraintTitle } = usePrizeOfferFormContext();

	const isOpen = useMemo(() => {
		return isModalOpen;
	}, [isModalOpen]);

	return (
		<>
			<Modal
				title={`${selectedConstraintTitle ? 'Add ' + selectedConstraintTitle + ' requirement' : 'Add requirement'}`}
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
