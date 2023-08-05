import React from 'react';
import Home from 'pages/home';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Fund from './pages/fund';
import Landing from 'pages/landing';
import Donate from 'pages/donate';
import NFT from 'pages/nft';
import About from 'pages/about';
import TokenTap from 'pages/token-tap';
import { UserProfileProvider } from './hooks/useUserProfile';
import RoutePath from 'routes';
import { RefreshContextProvider } from './context/RefreshContext';
import { ClaimProvider } from './hooks/useChainList';
import store from './state';
import { Provider } from 'react-redux';
import Web3Provider from 'components/Web3Provider';

import ConnectBrightIdModal from 'pages/home/components/ConnectBrightIdModal/connectBrightIdModal';
import BrightConnectionModal from 'pages/home/components/BrightConnectionModal/brightConnectionModal';
import ConnectMetamaskModal from 'pages/home/components/ConnectMetamaskModal/connectMetamaskModal';
import CreateBrightIdAccountModal from 'pages/home/components/CreateBrightIdAccountModal/createBrightIdAccountModal';
import { BlockNumberProvider } from 'lib/hooks/useBlockNumber';
import TokenTapProvider from 'hooks/token-tap/tokenTapContext';

import ApplicationUpdater from 'state/application/updater';
import TransactionUpdater from 'state/transactions/updater';
import UserUpdater from 'state/user/updater';
import { MulticallUpdater } from 'lib/state/multicall';
import ScrollToTop from 'components/basic/ScrollToTop/scrollToTop';
import PrizeTap from 'pages/prize-tap';
import ProviderDashboard from 'pages/provider-dashboard';
import { ErrorsProvider } from './context/ErrorsProvider';

require('typeface-jetbrains-mono');

function Updaters() {
	return (
		<>
			<UserUpdater />
			<ApplicationUpdater />
			<TransactionUpdater />
			<MulticallUpdater />
		</>
	);
}

function App() {
	return (
		<React.StrictMode>
			<Provider store={store}>
				<Web3Provider>
					<RefreshContextProvider>
						<ErrorsProvider>
							<UserProfileProvider>
								<ClaimProvider>
									<TokenTapProvider>
										<BrowserRouter>
											<BlockNumberProvider>
												<Updaters />
												<ScrollToTop>
													<Routes>
														<Route path={RoutePath.FAUCET} element={<Home />} />
														<Route path={RoutePath.FUND} element={<Fund />} />
														<Route path={RoutePath.LANDING} element={<Landing />} />
														<Route path={RoutePath.DONATE} element={<Donate />} />
														<Route path={RoutePath.NFT} element={<NFT />} />
														<Route path={RoutePath.ABOUT} element={<About />} />
														<Route path={RoutePath.PRIZE} element={<PrizeTap />} />
														<Route path={RoutePath.TOKEN} element={<TokenTap />} />
														<Route path={RoutePath.PROVIDERDASHBOARD} element={<ProviderDashboard />} />
													</Routes>
												</ScrollToTop>
												<ConnectBrightIdModal />
												<BrightConnectionModal />
												<ConnectMetamaskModal />
												<CreateBrightIdAccountModal />
											</BlockNumberProvider>
										</BrowserRouter>
									</TokenTapProvider>
								</ClaimProvider>
							</UserProfileProvider>
						</ErrorsProvider>
					</RefreshContextProvider>
				</Web3Provider>
			</Provider>
		</React.StrictMode>
	);
}

export default App;
