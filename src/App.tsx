import './App.css';

import { UserProfileProvider } from './hooks/useUserProfile';
import { RefreshContextProvider } from './context/RefreshContext';
import store from './state';
import { Provider } from 'react-redux';
import Web3Provider from 'components/Web3Provider';

import ConnectBrightIdModal from 'pages/home/components/ConnectBrightIdModal/connectBrightIdModal';
import BrightConnectionModal from 'pages/home/components/BrightConnectionModal/brightConnectionModal';
import ConnectMetamaskModal from 'pages/home/components/ConnectMetamaskModal/connectMetamaskModal';
import CreateBrightIdAccountModal from 'pages/home/components/CreateBrightIdAccountModal/createBrightIdAccountModal';
import { BlockNumberProvider } from 'lib/hooks/useBlockNumber';
import ApplicationUpdater from 'state/application/updater';
import TransactionUpdater from 'state/transactions/updater';
import UserUpdater from 'state/user/updater';
import { MulticallUpdater } from 'lib/state/multicall';
import { ErrorsProvider } from './context/ErrorsProvider';

import 'typeface-jetbrains-mono';

import GlobalContextProvider from 'hooks/useGlobalContext';
import Router from 'router';
import Layout from 'layout';

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
		<Provider store={store}>
			<Web3Provider>
				<RefreshContextProvider>
					<ErrorsProvider>
						<UserProfileProvider>
							<GlobalContextProvider>
								<BlockNumberProvider>
									<Router>
										<Layout>
											<Updaters />
											<ConnectBrightIdModal />
											<BrightConnectionModal />
											<ConnectMetamaskModal />
											<CreateBrightIdAccountModal />
										</Layout>
									</Router>
								</BlockNumberProvider>
							</GlobalContextProvider>
						</UserProfileProvider>
					</ErrorsProvider>
				</RefreshContextProvider>
			</Web3Provider>
		</Provider>
	);
}

export default App;
