import * as React from 'react';
import Icon from 'components/basic/Icon/Icon';
import Modal from 'components/common/Modal/modal';
import { ClaimContext } from 'hooks/useChainList';
import { useContext } from 'react';
import { UPModalState } from 'types';
import { useUnitapPass } from 'hooks/pass/useUnitapPass';
import { ClaimButton, GradientOutlinedButton } from 'components/basic/Button/button';
import { useNavigate } from 'react-router';

const UPCollectionToken = ({ index }: { index: number }) => {
	return (
		<div className="bg-gray30 mt-3 rounded-lg p-3 flex items-center">
			<Icon iconSrc="assets/images/navbar/up-icon.svg" />
			<span className="ml-2">Unitap Pass#{index}</span>
			<div className="ml-auto">
				<GradientOutlinedButton className="!w-28 !h-10" size="small">
					<p className="text-white font-semibold text-sm">View NFT</p>
				</GradientOutlinedButton>
			</div>
		</div>
	);
};

const UPCollectionsModalContent = () => {
	const { balance: unitapPassBalance } = useUnitapPass();
	const navigate = useNavigate();
	const gasCollectAmount = unitapPassBalance?.toNumber() || 0;
	const { closeUPModal } = useContext(ClaimContext);

	const navigateToPass = () => {
		navigate('/pass');
		closeUPModal();
	};

	return (
		<div data-testid="upcollections-modal" className="flex flex-col text-white items-center justify-center pt-2">
			<Icon
				data-testid="upcollections-logo"
				className="z-10 mb-12 mt-4"
				width="200px"
				iconSrc="assets/images/modal/unitap-pass.svg"
			/>
			{gasCollectAmount > 0 ? (
				<div className="text-left w-full">
					<p className="text-sm mb-2">Your Unitap Pass NFTs</p>
					{Array.from(new Array(gasCollectAmount)).map((_, key) => (
						<UPCollectionToken key={key} index={key} />
					))}
				</div>
			) : (
				<div className="w-full">
					<p className="text-sm text-center">It seems like you don{"'"}t have any Unitap passes.</p>
					<ClaimButton onClick={navigateToPass} className="mt-10 !w-full">
						<p>Get Unitap Pass</p>
					</ClaimButton>
				</div>
			)}
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
