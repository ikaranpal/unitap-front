import { useContext, useMemo } from 'react';
import { useWeb3React } from '@web3-react/core';
import { UserProfileContext } from 'hooks/useUserProfile';
import PrizeOfferFormContext from 'pages/provider-dashboard/components/Context/PrizeOfferFormContext';
import { RenderBrightNotConnectedBody } from 'pages/provider-dashboard/components/CreateRaffleModal/RenderBrightNotConnectedBody';
import { RenderWalletNotConnectedBody } from 'pages/provider-dashboard/components/CreateRaffleModal/RenderWalletNotConnectedBody';
import Modal from 'components/common/Modal/modal';
import { ClaimButton } from 'components/basic/Button/button';
import { switchChain } from 'utils/switchChain';
import { Chain } from 'types';

const PrizeInfoModalBody = ({ chain }: { chain: Chain | null }) => {
	const { account, chainId, connector } = useWeb3React();
	const walletConnected = !!account;
	const { userProfile } = useContext(UserProfileContext);

	function renderWrongNetworkBody(chain: Chain) {
		return (
			<>
				{/* <DropIconWrapper data-testid={`chain-claim-wrong-network`}>
					<Icon
						className="chain-logo z-10 mt-14 mb-10"
						width="auto"
						height="110px"
						iconSrc={selectedRaffleForEnroll!.isPrizeNft ? tokenImgLink : selectedRaffleForEnroll!.imageUrl}
						alt=""
					/>
				</DropIconWrapper> */}
				<p className="text-sm font-medium text-white mt-2 mb-12 text-center px-4 leading-6">
					You need to switch to the <strong>{chain.chainName}</strong> network.
				</p>

				<ClaimButton
					onClick={() => switchChain(connector, chain)}
					width="100%"
					className="!w-full"
					fontSize="16px"
					data-testid={`chain-claim-action-${chain.pk}`}
				>
					<p>Switch Network</p>
				</ClaimButton>
			</>
		);
	}

	const getEnrollModalBody = () => {
		if (!userProfile) return <RenderBrightNotConnectedBody />;
		if (!walletConnected) return <RenderWalletNotConnectedBody />;
		if (chain && (!chainId || chainId.toString() !== chain.chainId)) return renderWrongNetworkBody(chain);
	};

	return (
		<div className="claim-modal-wrapper flex flex-col items-center justify-center pt-5">{getEnrollModalBody()}</div>
	);
};

const PrizeInfoConnectModal = ({ chain, isOpen }: { chain: Chain | null; isOpen: boolean }) => {
	const { closeCreateRaffleModal } = useContext(PrizeOfferFormContext);
	return (
		<Modal title="Connect" size="small" closeModalHandler={closeCreateRaffleModal} isOpen={isOpen}>
			<PrizeInfoModalBody chain={chain} />
		</Modal>
	);
};

export default PrizeInfoConnectModal;
