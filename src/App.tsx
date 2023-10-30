import './App.css';

import ApplicationUpdater from 'state/application/updater';
import TransactionUpdater from 'state/transactions/updater';

import 'typeface-jetbrains-mono';

import Router from 'router';
import Layout from 'layout';

import {
	ConnectBrightIdModal,
	BrightConnectionModal,
	ConnectMetamaskModal,
	CreateBrightIdAccountModal,
} from 'components/containers/modals';

function Updaters() {
	return (
		<>
			<ApplicationUpdater />
			<TransactionUpdater />
			{/* <MulticallUpdater /> */}
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
