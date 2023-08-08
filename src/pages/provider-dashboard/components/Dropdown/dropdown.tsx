import Icon from 'components/basic/Icon/Icon';
import Label from 'components/basic/Label/label';
import { DropdownWrapper } from './dropdownWrapper';
import { useEffect, useState } from 'react';

interface DropdownProps {
	label?: string;
	icon?: string;
	value: string;
	setShowItems: (showItems: boolean) => void;
	showItems: boolean;
	onClick?: () => void;
	'data-testid'?: string;
}

const Dropdown = (props: DropdownProps) => {
	const { label, value, icon, onClick, setShowItems, showItems } = props;
	const [inputValue, setInputValue] = useState(value);
	useEffect(() => {
		setInputValue(value);
	}, [value]);
	const handleChange = (e: string) => {
		setInputValue(e);
	};
	return (
		<DropdownWrapper data-testid={props['data-testid']}>
			{label ? <Label>{label}</Label> : null}
			<div className="dropdown" onClick={() => setShowItems((previous: boolean) => !previous)}>
				{icon ? <Icon iconSrc={icon} width="24px" /> : null}
				<input
					className="dropdown-value bg-transparent"
					placeholder="Search for Chain"
					value={inputValue}
					onChange={(e) => handleChange(e.target.value)}
				/>
				<Icon
					iconSrc={showItems ? 'assets/images/provider-dashboard/arrow-top.svg' : 'assets/images/fund/arrow-down.png'}
					width="14px"
					height="auto"
				></Icon>
			</div>
		</DropdownWrapper>
	);
};

export default Dropdown;
