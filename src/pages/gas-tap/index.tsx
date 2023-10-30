import { GasClaimContext } from 'hooks/useChainList';
import { useContext } from 'react';
import Home from './page';
import GasTapLoading from './loading';
import ProvideGasCard from './components/Cards/ProvideGasCard/provideGasCard';
import Footer from 'components/containers/common/Footer/footer';
import FundGasModal from './components/Modals/FundGasModal';

const GasTapWrapper = () => {
	const { chainList } = useContext(GasClaimContext);

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

export default GasTapWrapper;
