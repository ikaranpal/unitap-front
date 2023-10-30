import { SecondaryGreenColorButton } from 'components/basic/Button/button';
import { Text } from 'components/basic/Text/text.style';
import { FC } from 'react';
import { Chain } from 'types';

const ClaimPendingBody: FC<{ chain: Chain; closeClaimModal: () => void }> = ({ chain, closeClaimModal }) => {
	return (
		<>
			<div data-testid={`chain-claim-pending-${chain.pk}`} id="animation" style={{ width: '200px' }}></div>
			<Text width="100%" fontSize="14" color="space_green" textAlign="center">
				Claim transaction submitted
			</Text>
			<Text width="100%" fontSize="14" color="second_gray_light" mb={3} textAlign="center">
				The claim transaction will be compeleted soon
			</Text>
			<SecondaryGreenColorButton
				onClick={closeClaimModal}
				width={'100%'}
				data-testid={`chain-claim-action-${chain.pk}`}
			>
				Close
			</SecondaryGreenColorButton>
		</>
	);
};

export default ClaimPendingBody;
