import { ClaimButton } from 'components/ui/Button/button';
import Icon from 'components/ui/Icon/Icon';
import { useGlobalContext } from 'hooks/useGlobalContext';
import { FC } from 'react';
import { DropIconWrapper } from '../claimModal.style';

const BrightIdNotConnectedBody: FC<{ iconSrc: string; chainPk: number }> = ({ iconSrc, chainPk }) => {
	const { openBrightIdModal } = useGlobalContext();

	return (
		<>
			<DropIconWrapper data-testid={`chain-claim-brightid-not-connected`}>
				<Icon className="chain-logo z-10 mt-14 mb-10" width="auto" height="110px" iconSrc={iconSrc} alt="" />
			</DropIconWrapper>
			<p className="text-white text-sm mb-5 mt-11">You need to connect your BrightID to claim your tokens</p>

			<ClaimButton
				onClick={openBrightIdModal}
				width="100%"
				className="!w-full"
				fontSize="16px"
				data-testid={`chain-claim-action-${chainPk}`}
			>
				<p>Connect BrightID</p>
			</ClaimButton>
		</>
	);
};

export default BrightIdNotConnectedBody;
