import Icon from 'components/basic/Icon/Icon';
import Modal from 'components/common/Modal/modal';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useMemo } from 'react';

const ShowPreviewModalBody = () => {
	function renderInitialBody() {
		return <div className="flex flex-col gap-2 "></div>;
	}

	const getRequirementModalBody = () => {
		return renderInitialBody();
	};

	return <div className="claim-modal-wrapper flex flex-col  pt-5">{getRequirementModalBody()}</div>;
};

const ShowPreviewModal = () => {
	const { closeShowPreviewModal, isModalOpen } = usePrizeOfferFormContext();
	const isOpen = useMemo(() => {
		return isModalOpen;
	}, [isModalOpen]);

	return (
		<>
			<Modal title="Form you Filled" size="large" closeModalHandler={closeShowPreviewModal} isOpen={isOpen}>
				<ShowPreviewModalBody />
			</Modal>
		</>
	);
};

export default ShowPreviewModal;
