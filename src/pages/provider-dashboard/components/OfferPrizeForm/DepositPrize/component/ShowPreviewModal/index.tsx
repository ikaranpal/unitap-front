import Modal from 'components/common/Modal/modal';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useMemo } from 'react';
import RenderInitialBody from './RenderInitialBody';

const ShowPreviewModalBody = () => {
	const { data } = usePrizeOfferFormContext();

	const getShowPreviewBody = () => {
		return <RenderInitialBody data={data} />;
	};

	return <div className="claim-modal-wrapper flex flex-col pt-5 p-2 min-h-[250px]">{getShowPreviewBody()}</div>;
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
