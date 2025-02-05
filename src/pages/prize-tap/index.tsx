import Header from './components/Header/header';
import Footer from 'components/common/Footer/footer';
import RafflesList from './components/RafflesList/RafflesList';
import EnrollModal from './components/EnrollModal';
import BrightConnectionModal from 'pages/home/components/BrightConnectionModal/brightConnectionModal';
import LineaWinnersModal from './components/LiniaRaffle/LineaWinnersModal';
import LineaCheckWalletsModal from './components/LiniaRaffle/LineaCheckWalletsModal';

const PrizeTap = () => {
	return (
		<div className="prize-tap">
			<div className="content-wrapper">
				<Header />
				<RafflesList />
			</div>
			<Footer />
			<LineaCheckWalletsModal />
			<LineaWinnersModal />
			<EnrollModal />
			<BrightConnectionModal />
		</div>
	);
};

export default PrizeTap;
