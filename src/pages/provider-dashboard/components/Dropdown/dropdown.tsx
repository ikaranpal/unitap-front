import Icon from 'components/basic/Icon/Icon';
import Label from 'components/basic/Label/label';
import { DropdownWrapper } from './dropdownWrapper';

interface DropdownProps {
	label?: string;
	icon?: string;
	value?: string;
	onClick: () => void;
	handleSearchChain: () => void;
	showItems: boolean;
	'data-testid'?: string;
}

const Dropdown = (props: DropdownProps) => {
	const { label, value, icon, onClick, showItems, handleSearchChain } = props;
	return (
		<DropdownWrapper onClick={onClick} data-testid={props['data-testid']}>
			{label ? <Label>{label}</Label> : null}
			<div className="dropdown">
				{icon ? <Icon iconSrc={icon} width="24px" /> : null}
				<input
					className="w-full bg-transparent text-white px-2"
					type="text"
					value={value}
					placeholder="Search for Chain"
					onChange={handleSearchChain}
				/>
				<Icon
					iconSrc={!showItems ? 'assets/images/fund/arrow-down.png' : 'assets/images/provider-dashboard/arrow-top.svg'}
					width="14px"
					height="auto"
				></Icon>
			</div>
		</DropdownWrapper>
	);
};

export default Dropdown;
