import Icon from 'components/basic/Icon/Icon';
import React from 'react';

const Requirements = () => {
	return (
		<div className="text-gray100 text-[12px] font-medium flex flex-col gap-5 w-full  max-w-[452px] min-w-[300px]">
			<p>Add any requirements for Enrolling or leave it free.</p>
			<div className="flex items-center justify-between bg-gray40 h-[44px] rounded-xl px-4 text-white text-[14px] font-medium">
				<p>Should satisfy all</p>
				<Icon iconSrc="assets/images/fund/arrow-down.png" height="8px" width="14px" />
			</div>

			<div className="flex items-center gap-2 bg-gray40 h-[44px] rounded-xl px-4 text-white text-[12px]">
				<Icon iconSrc="assets/images/provider-dashboard/add-requirement.svg" height="16px" width="16px" />
				<p>Add requirement</p>
			</div>
		</div>
	);
};

export default Requirements;
