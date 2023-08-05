import Icon from 'components/basic/Icon/Icon';
import React from 'react';

const Header = () => {
	return (
		<div className="header providerDashboard__header w-full h-[202px] rounded-2xl flex items-center overflow-hidden p-5 mb-6  ">
			<div className="header__left items-center h-auto">
				<img className="gas-tap h-auto w-375 mb-3" src="assets/images/provider-dashboard/blibk neon.png" />
				<p className="z-10 text-sm text-gray100 text-[12px] max-w-[365px]">
					Here you can see your history of your previous provides and you can provide more ;)
				</p>
			</div>
		</div>
	);
};

export default Header;
