import { useState } from 'react';
import Header from './components/Header/header';
import Icon from 'components/basic/Icon/Icon';
import Footer from 'components/common/Footer/footer';
import PrizeTapContent from './components/PrizeTapContent';
import GasTapContent from './components/GasTapContent';
import TokenTapContent from './components/TokenTapContent';
import { PrizeOfferFromProvider } from './components/Context/PrizeOfferFromContext';

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
					<PrizeOfferFromProvider>
						<PrizeTapContent />
					</PrizeOfferFromProvider>
				)}
			</div>
			<Footer />
		</div>
	);
};

const ProviderDashboardTabs = ({ onSelectTab, selectedTab }: SelectedTabProps) => {
	return (
		<div className="mb-6  provider-dashboard__tabs flex bg-gray20 justify-between text-center text-gray80 font-semibold ">
			<div
				className={`w-full p-3 flex flex-col-reverse sm:flex-row gap-2 items-center cursor-pointer justify-center border-b-3  ${
					selectedTab == tabs.gasTap ? 'borer-b-white text-white' : 'border-b-gray60'
				}`}
				onClick={() => onSelectTab(tabs.gasTap)}
			>
				Gas Tap{' '}
				{selectedTab == tabs.gasTap ? (
					<Icon iconSrc="assets/images/provider-dashboard/gas-tap.svg" />
				) : (
					<Icon iconSrc="assets/images/provider-dashboard/gas-tap-dark.svg" />
				)}
			</div>
			<div
				className={`w-full p-3 flex flex-col-reverse sm:flex-row  gap-2 items-center cursor-pointer justify-center border-b-3  ${
					selectedTab == tabs.tokenTap ? 'borer-b-white text-white' : 'border-b-gray60'
				}`}
				onClick={() => onSelectTab(tabs.tokenTap)}
			>
				Token Tap{' '}
				{selectedTab == tabs.tokenTap ? (
					<Icon iconSrc="assets/images/provider-dashboard/token-tap.svg" />
				) : (
					<Icon iconSrc="assets/images/provider-dashboard/token-tap-dark.svg" />
				)}
			</div>
			<div
				className={`w-full p-3 flex flex-col-reverse sm:flex-row  gap-2 items-center cursor-pointer justify-center border-b-3  ${
					selectedTab == tabs.prizeTap ? 'borer-b-white text-white' : 'border-b-gray60'
				}`}
				onClick={() => onSelectTab(tabs.prizeTap)}
			>
				Prize Tap
				{selectedTab == tabs.prizeTap ? (
					<Icon iconSrc="assets/images/provider-dashboard/prize-tap.svg" />
				) : (
					<Icon iconSrc="assets/images/provider-dashboard/prize-tap-dark.svg" />
				)}
			</div>
		</div>
	);
};

export default ProviderDashboard;
