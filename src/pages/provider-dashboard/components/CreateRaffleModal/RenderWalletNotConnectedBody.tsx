import { ClaimButton } from 'components/basic/Button/button';
import useWalletActivation from 'hooks/useWalletActivation';

export function RenderWalletNotConnectedBody() {
	const { tryActivation } = useWalletActivation();
	return (
		<>
			{/* <DropIconWrapper data-testid={`chain-claim-wallet-not-connected`}>
				<Icon
					className="chain-logo z-10 mt-14 mb-10"
					width="auto"
					height="110px"
					iconSrc={selectedRaffleForEnroll!.isPrizeNft ? tokenImgLink : selectedRaffleForEnroll!.imageUrl}
					alt=""
				/>
			</DropIconWrapper> */}

			<p className="text-sm font-medium text-white mt-2 mb-12 text-center px-4 leading-6">Connect your wallet</p>

			<ClaimButton onClick={tryActivation} width="100%" fontSize="16px" className="!w-full">
				<p>Connect Wallet</p>
			</ClaimButton>
		</>
	);
}
