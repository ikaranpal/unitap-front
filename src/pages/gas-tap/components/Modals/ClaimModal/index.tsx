import { useMemo } from 'react';
import { Text } from 'components/basic/Text/text.style';
import { DropIconWrapper } from 'pages/gas-tap/components/Modals/ClaimModal/claimModal.style';
import Icon from 'components/basic/Icon/Icon';
import { ClaimButton } from 'components/basic/Button/button';
import { BrightIdModalState, Chain, ClaimReceiptState } from 'types';
import { getChainClaimIcon, shortenAddress } from 'utils';
import { useGasClaimContext } from 'hooks/useChainList';
import { formatWeiBalance } from 'utils/numbers';
import WalletAddress from 'pages/gas-tap/components/Modals/ClaimModal/walletAddress';
import Modal from 'components/containers/common/Modal/modal';
import { useWeb3React } from '@web3-react/core';
import { useUserProfileContext } from 'hooks/useUserProfile';
import ClaimNotAvailable from '../ClaimNotRemaining';
import { useGlobalContext } from 'hooks/useGlobalContext';
import {
	BrightIdNotVerifiedBody,
	WalletNotConnectedBody,
	ClaimSuccessBody,
	ClaimPendingBody,
	ClaimFailedBody,
	BrightIdNotConnectedBody,
} from './ModalStatusesBody';

const ClaimModalBody = ({ chain }: { chain: Chain }) => {
	const { account } = useWeb3React();
	const walletConnected = !!account;

	const { claim, closeClaimModal, activeClaimReceipt, claimLoading, activeChain } = useGasClaimContext();

	const { userProfile, remainingClaims } = useUserProfileContext();

	if (!userProfile) return <BrightIdNotConnectedBody chainPk={chain.pk} iconSrc={getChainClaimIcon(chain)} />;

	if (!userProfile.isMeetVerified) return <BrightIdNotVerifiedBody />;

	if (!walletConnected) return <WalletNotConnectedBody chainPk={chain.pk} />;

	if (!activeClaimReceipt && (!remainingClaims || remainingClaims <= 0)) return <ClaimNotAvailable />;

	if (activeClaimReceipt?.status === ClaimReceiptState.VERIFIED)
		return <ClaimSuccessBody activeClaimReceipt={activeClaimReceipt} chain={chain} />;

	if (activeClaimReceipt?.status === ClaimReceiptState.PENDING)
		return <ClaimPendingBody activeClaimReceipt={activeClaimReceipt} chain={chain} closeClaimModal={closeClaimModal} />;

	if (activeClaimReceipt?.status === ClaimReceiptState.REJECTED)
		return <ClaimFailedBody chain={chain} claim={claim} claimLoading={claimLoading} />;

	if (!activeChain) return null;

	return (
		<>
			<DropIconWrapper data-testid={`chain-claim-initial-${chain.pk}`}>
				<Icon
					className="chain-logo z-10 mt-14 mb-10"
					width="auto"
					height="110px"
					iconSrc={getChainClaimIcon(chain)}
					alt=""
				/>
			</DropIconWrapper>
			<Text width="100%" fontSize="14">
				Wallet Address
			</Text>
			<WalletAddress fontSize="12">{walletConnected ? shortenAddress(account) : ''}</WalletAddress>
			<ClaimButton
				onClick={() => claim(chain.pk)}
				width="100%"
				fontSize="16px"
				className="!w-full"
				data-testid={`chain-claim-action-${chain.pk}`}
			>
				{claimLoading ? (
					<p>Claiming...</p>
				) : (
					<p>{`Claim ${formatWeiBalance(activeChain.maxClaimAmount)} ${activeChain.symbol}`}</p>
				)}
			</ClaimButton>
		</>
	);
};

const ClaimModal = () => {
	const { closeClaimModal, activeChain } = useGasClaimContext();
	const { brightidModalStatus } = useGlobalContext();

	const isOpen = useMemo(() => {
		return !!activeChain && brightidModalStatus === BrightIdModalState.CLOSED;
	}, [activeChain, brightidModalStatus]);

	if (!activeChain) return null;

	return (
		<>
			<Modal
				title={`Claim ${formatWeiBalance(activeChain.maxClaimAmount)} ${activeChain.symbol}`}
				size="small"
				closeModalHandler={closeClaimModal}
				isOpen={isOpen}
			>
				<div
					className="claim-modal-wrapper flex flex-col items-center justify-center pt-5"
					data-testid={`chain-claim-modal-${activeChain.pk}`}
				>
					<ClaimModalBody chain={activeChain} />
				</div>
			</Modal>
		</>
	);
};
export default ClaimModal;
