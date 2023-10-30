import { GasClaimContext } from 'hooks/useChainList';
import { useContext } from 'react';
import Home from './page';
import GasTapLoading from './loading';
import ProvideGasCard from './components/ProvideGasCard/provideGasCard';
import Footer from 'components/containers/common/Footer/footer';
import FundContextProvider from './context/fundContext';

const GasTapWrapper = () => {
	const { chainList } = useContext(GasClaimContext);

	return (
		<>
			<FundContextProvider>
				<div className="content-wrapper">
					{chainList.length ? <Home /> : <GasTapLoading />}
					<ProvideGasCard />
				</div>
				<Footer />
			</FundContextProvider>
		</>
	);
};

export default GasTapWrapper;
