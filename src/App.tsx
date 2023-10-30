import './App.css';
import 'typeface-jetbrains-mono';

import ApplicationUpdater from 'state/application/updater';
import TransactionUpdater from 'state/transactions/updater';
import UserUpdater from 'state/user/updater';
import { MulticallUpdater } from 'lib/state/multicall';

import Router from 'router';
import Layout from 'layout';

import BrightConnectionModal from 'components/containers/modals/BrightConnectionModal/brightConnectionModal';
import ConnectBrightIdModal from 'components/containers/modals/ConnectBrightIdModal/connectBrightIdModal';
import ConnectMetamaskModal from 'components/containers/modals/ConnectMetamaskModal/connectMetamaskModal';
import CreateBrightIdAccountModal from 'components/containers/modals/CreateBrightIdAccountModal/createBrightIdAccountModal';

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
		<Router>
			<Layout>
				<Updaters />
				<ConnectBrightIdModal />
				<BrightConnectionModal />
				<ConnectMetamaskModal />
				<CreateBrightIdAccountModal />
			</Layout>
		</Router>
	);
}

export default App;
