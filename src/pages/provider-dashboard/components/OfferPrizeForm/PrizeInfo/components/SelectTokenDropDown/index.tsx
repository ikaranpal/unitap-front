import Icon from 'components/basic/Icon/Icon';

const SelectTokenDropDown = () => {
	return (
		<div className="flex bg-gray40 gap-2 border border-gray50 rounded-[12px] w-full max-w-[452px] py-3 pr-3 overflow-hidden h-[44px] items-center">
			<div className="flex bg-gray30 items-center justify-center gap-4 px-2 min-w-[85px] h-[44px]">
				<Icon iconSrc={'/assets/images/provider-dashboard/btc.svg'} height="24px" width="24px" />
				<Icon iconSrc={'/assets/images/provider-dashboard/arrow-down.svg'} height="14px" width="8px" />
			</div>
			<input placeholder="Enter amount" className="bg-transparent text-gray80 placeholder-gray80 text-[14px] w-full" />
			<div className="flex items-center justify-center text-gray100 text-[12px] bg-gray20 border border-gray100 rounded-[8px] h-[28px] w-[52px]">
				Max
			</div>
		</div>
	);
};

export default SelectTokenDropDown;
