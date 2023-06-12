import * as React from 'react';
import Icon from 'components/basic/Icon/Icon';
import Modal from 'components/common/Modal/modal';
import { ClaimContext } from 'hooks/useChainList';
import { useContext } from 'react';
import { UPModalState } from 'types';

const UPCollectionToken = () => {
	return <div className="">salam</div>;
};

const UPCollectionsModalContent = () => {
	return (
		<div data-testid="upcollections-modal" className="flex flex-col items-center justify-center pt-2">
			<Icon
				data-testid="upcollections-logo"
				className="bright-logo z-10 mb-14 mt-4"
				width="200px"
				iconSrc="assets/images/modal/unitap-pass.svg"
			/>
			<div className="text-left w-full">
				<p className="text-sm text-white mb-2">Your Unitap Pass NFTs</p>
			</div>
		</div>
	);
};

const UPCollectionsModal = () => {
	const { upModalState, closeUPModal } = useContext(ClaimContext);

	return (
		<Modal
			title="Unitap Passes"
			size="small"
			isOpen={upModalState !== UPModalState.CLOSED}
			closeModalHandler={closeUPModal}
		>
			<UPCollectionsModalContent />
		</Modal>
	);
};

export default UPCollectionsModal;
