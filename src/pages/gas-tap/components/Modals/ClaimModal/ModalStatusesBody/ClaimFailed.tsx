import { ClaimButton } from 'components/basic/Button/button';
import Icon from 'components/basic/Icon/Icon';
import { FC } from 'react';
import { Chain } from 'types';
import { getChainClaimIcon } from 'utils';
import { DropIconWrapper } from '../claimModal.style';
import { Text } from 'components/basic/Text/text.style';

const ClaimFailedBody: FC<{ chain: Chain; claimLoading: boolean; claim: (chainPK: number) => void }> = ({
	chain,
	claim,
	claimLoading,
}) => {
	return (
		<>
			<DropIconWrapper data-testid={`chain-claim-failed-${chain.pk}`}>
				<Icon
					className="chain-logo z-10 mt-14 mb-10"
					width="auto"
					height="110px"
					iconSrc={getChainClaimIcon(chain)}
					alt=""
				/>
			</DropIconWrapper>
			<span className="flex justify-center items-center font-medium mb-3">
				<Text className="!mb-0" width="100%" fontSize="14" color="warningRed" textAlign="center">
					Claim Failed!
				</Text>
				<Icon iconSrc="assets/images/modal/failed-state-x.svg" width="22px" height="auto" className="ml-2" />
			</span>
			<Text width="100%" fontSize="14" color="second_gray_light" mb={3} textAlign="center">
				An error occurred while processing your request
			</Text>
			<ClaimButton
				fontSize="16px"
				onClick={() => claim(chain.pk)}
				width={'100%'}
				className="!w-full"
				data-testid={`chain-claim-action-${chain.pk}`}
			>
				{claimLoading ? <p>Claiming...</p> : <p>Try Again</p>}
			</ClaimButton>
		</>
	);
};

export default ClaimFailedBody;
