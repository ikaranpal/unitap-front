import styled from 'styled-components';
import { DV } from 'components/basic/designVariables';

export const DropdownWrapper = styled.div`
	width: 100%;

	.dropdown {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: ${DV.sizes.basePadding * 1.5}px;
		padding-right: ${DV.sizes.basePadding * 3}px;
		height: 44px;
		width: 452px;
		box-sizing: border-box;
		border-radius: ${DV.sizes.baseRadius * 1.5}px;

		&:hover {
			cursor: pointer;
		}
	}

	.dropdown-value {
		margin: 0 auto 0 ${DV.sizes.baseMargin * 2}px;
		color: white;
	}
`;
