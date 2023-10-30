import { useGasClaimContext } from 'hooks/useChainList';
import Home from './page';
import GasTapLoading from './loading';
import FundContextProvider from './components/Modals/FundGasModal';
import { MetaData } from 'types';
import ProvideGasCard from './components/Cards/ProvideGasCard/provideGasCard';
import Footer from 'components/containers/common/Footer/footer';
import FundGasModal from './components/Modals/FundGasModal';

const GasTapWrapper = () => {
	const { chainList } = useGasClaimContext();

	return (
		<>
			<FundGasModal>
				<div className="content-wrapper">
					{chainList.length ? <Home /> : <GasTapLoading />}
					<ProvideGasCard />
				</div>
				<Footer />
			</FundGasModal>
		</>
	);
};

export const metadata: MetaData = {
	title: 'Unitap | Gas Tap',
};

export default GasTapWrapper;
