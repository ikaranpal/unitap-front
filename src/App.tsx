import './App.css';
// import 'typeface-jetbrains-mono';

import ApplicationUpdater from 'state/application/updater';
import TransactionUpdater from 'state/transactions/updater';
import { MulticallUpdater } from 'lib/state/multicall';

import Router from 'router';
import Layout from 'layout';
import BrightConnectionModal from 'components/containers/modals/brightConnectionModal';
import ConnectBrightIdModal from 'components/containers/modals/connectBrightIdModal';
import ConnectMetamaskModal from 'components/containers/modals/connectMetamaskModal';
import CreateBrightIdAccountModal from 'components/containers/modals/createBrightIdAccountModal';

function Updaters() {
	return (
		<>
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
