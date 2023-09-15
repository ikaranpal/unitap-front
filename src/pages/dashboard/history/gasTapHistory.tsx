import Icon from 'components/basic/Icon/Icon';
import Footer from 'components/common/Footer/footer';
import { Link } from 'react-router-dom';

const GasTapHistory = () => {
	return (
		<div>
			<div className="content-wrapper">
				<div className="bg-gray20 mt-28 rounded-xl p-5 flex items-center">
					<Link to="/dashboard/up-profile" className="mr-auto">
						<Icon iconSrc="/assets/images/up-profile/back.svg" />
					</Link>
					<h4 className="mr-auto">Taps History</h4>
				</div>
				<div className="bg-gray20 rounded-xl mt-5 p-5 flex items-center">
					<div className="flex items-center justify-between"></div>
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default GasTapHistory;
