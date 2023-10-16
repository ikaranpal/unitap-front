import { useState } from 'react';
import Header from './components/Header/header';
import Icon from 'components/basic/Icon/Icon';
import Footer from 'components/common/Footer/footer';
import PrizeTapContent from './components/PrizeTapContent';
import GasTapContent from './components/GasTapContent';
import TokenTapContent from './components/TokenTapContent';
import { PrizeOfferFormProvider } from './components/Context/PrizeOfferFormContext';

interface SelectedTabProps {
	onSelectTab: (tab: string) => void;
	selectedTab: string;
}

const tabs = { gasTap: 'gasTap', tokenTap: 'tokenTap', prizeTap: 'prizeTap' };

const ProviderDashboard = () => {
	const [selectedTab, setSelectedTab] = useState(tabs.gasTap);
	return (
		<div className="provider-dashboard">
			<div className="content-wrapper-provider-dashboard">
				<Header />
				<ProviderDashboardTabs onSelectTab={setSelectedTab} selectedTab={selectedTab} />
				{selectedTab == tabs.gasTap && <GasTapContent />}
				{selectedTab == tabs.tokenTap && <TokenTapContent />}
				{selectedTab == tabs.prizeTap && (
					<PrizeOfferFormProvider>
						<PrizeTapContent />
					</PrizeOfferFormProvider>
				)}
			</div>
			<Footer />
		</div>
	);
};

const ProviderDashboardTabs = ({ onSelectTab, selectedTab }: SelectedTabProps) => {
	const [borderPosition, setBorderPosition] = useState('after:left-0');

	const handleSelectTap = (tap: string) => {
		setBorderPosition(
			tap == tabs.gasTap ? 'after:left-0' : tap == tabs.tokenTap ? 'after:left-[33.3%]' : 'after:left-[66.6%]',
		);
		onSelectTab(tap);
	};

	return (
		<div
			className={`${borderPosition} mb-4 select-not provider-dashboard__tabs after:transition-all transition after:duration-[1s] ease-in-out  after:border after:absolute after:w-[33%] after:bottom-[-1.5px] flex bg-gray20 justify-between text-center text-white font-semibold border-b-2  border-gray80`}
		>
			<div
				className={`w-full p-3 flex flex-col-reverse sm:flex-row gap-2 items-center transition duration-[1s] delay-260 ease-in-out cursor-pointer justify-center ${
					selectedTab == tabs.gasTap ? ' text-white' : 'opacity-[0.2]'
				}`}
				onClick={() => handleSelectTap(tabs.gasTap)}
			>
				Gas Tap <Icon iconSrc="assets/images/provider-dashboard/gas-tap.svg" />
			</div>
			<div
				className={`w-full p-3 flex flex-col-reverse sm:flex-row  gap-2 items-center transition duration-[1s] delay-260 ease-in-out cursor-pointer justify-center ${
					selectedTab == tabs.tokenTap ? ' text-white' : 'opacity-[0.2]'
				}`}
				onClick={() => handleSelectTap(tabs.tokenTap)}
			>
				Token Tap <Icon iconSrc="assets/images/provider-dashboard/token-tap.svg" />
			</div>
			<div
				className={`w-full p-3 flex flex-col-reverse sm:flex-row  gap-2 items-center transition duration-[1s] delay-260 ease-in-out cursor-pointer justify-center ${
					selectedTab == tabs.prizeTap ? ' text-white opacity-1' : 'opacity-[0.2]'
				}`}
				onClick={() => handleSelectTap(tabs.prizeTap)}
			>
				Prize Tap
				<Icon iconSrc="assets/images/provider-dashboard/prize-tap.svg" />
			</div>
		</div>
	);
};

export default ProviderDashboard;
