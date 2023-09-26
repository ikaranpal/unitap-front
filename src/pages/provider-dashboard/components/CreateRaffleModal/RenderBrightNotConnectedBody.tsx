import { ClaimButton } from 'components/basic/Button/button';
import { GlobalContext } from 'hooks/useGlobalContext';
import { useContext } from 'react';

export function RenderBrightNotConnectedBody() {
	const { openBrightIdModal } = useContext(GlobalContext);
	return (
		<>
			{/* <DropIconWrapper data-testid={`chain-claim-brightid-not-connected`}>
				<Icon
					className="chain-logo z-10 mt-14 mb-10"
					width="auto"
					height="110px"
					iconSrc={selectedRaffleForEnroll!.isPrizeNft ? tokenImgLink : selectedRaffleForEnroll!.imageUrl}
					alt=""
				/>
			</DropIconWrapper> */}

			<p className="text-white text-sm mb-5 mt-11">You need to connect your BrightID</p>

			<ClaimButton
				onClick={() => {
					openBrightIdModal();
				}}
				width="100%"
				className="!w-full"
				fontSize="16px"
			>
				<p>Connect BrightID</p>
			</ClaimButton>
		</>
	);
}
