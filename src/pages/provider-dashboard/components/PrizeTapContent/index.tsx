import {
	ProviderDashboardButton,
	ProviderDashboardButtonCheck,
	ProviderDashboardButtonRejected,
	ProviderDashboardButtonSuccess,
} from 'components/basic/Button/button';
import Icon from 'components/basic/Icon/Icon';
import SearchInput from '../SearchInput/searchInput';
import OfferPrizeForm from '../OfferPrizeForm';
import { RaffleCardTimer } from 'pages/prize-tap/components/RafflesList/RafflesList';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';

interface PrizeInfo {
	chianName: string;
	chainIcon: string;
	amount: string;
	creator: string;
	spots: string;
	startTime: string;
	endTime: string;
	status: string;
	imageSrc: string;
}

interface PrizeCardProp {
	prize: PrizeInfo;
}

const PrizeCard = ({ prize }: PrizeCardProp) => {
	return (
		<div className="bg-gray30 border-2 border-gray40 w-full  p-4 rounded-xl relative h-[512px]">
			<div className="providePrize-item-container">
				<div className="providePrize__amountBox bg-gray20 border border-gray40 h-[288px] rounded-2xl flex flex-col items-center justify-center relative">
					<div className="providePrize__chainName absolute top-0 mt-2 w-full max-w-[100px] py-1 flex items-center justify-center bg-gray50 border border-gray70 rounded-[6px]">
						<Icon className="mr-2" iconSrc={prize.chainIcon} width="15px" height="14px" />
						<p className="text-gray100 text-[10px] font-medium">on {prize.chianName}</p>
					</div>
					<div className="providePrize__amount flex items-center gap-2" data-amount="1.00 ETH">
						<p>{prize.amount}</p> <Icon iconSrc={prize.imageSrc} width="25.8px" height="39.9px" />
					</div>
				</div>
				<div>
					<div className="providePrize_stats flex justify-between my-2">
						<div className="text-white text-[14px] font-medium">{prize.amount}</div>
						{prize.status === 'Ongoing' ? (
							<ProviderDashboardButton>
								<p>Ongoing...</p>
							</ProviderDashboardButton>
						) : prize.status === 'Verified' ? (
							<ProviderDashboardButtonSuccess>Verified</ProviderDashboardButtonSuccess>
						) : (
							<ProviderDashboardButtonRejected>Rejected</ProviderDashboardButtonRejected>
						)}
					</div>
					<div className="providePrize_creator text-[12px] text-gray90 font-medium">by {prize.creator}</div>
				</div>
				{prize.spots && (
					<div className="providePrize_Spots bg-gray50 rounded-xl text-[14px] font-medium text-white h-[48px] my-3 flex items-center justify-center">
						{prize.spots} Spots Left
					</div>
				)}
				{prize.status === 'Rejected' ? (
					<div className="providePrize_timer absolute bottom-3 right-4 left-4">
						<ProviderDashboardButtonCheck>Check For Reasons</ProviderDashboardButtonCheck>
					</div>
				) : (
					<div className="providePrize_timer absolute bottom-3 right-4 left-4">
						<p className="text-white font-medium text-[8px] font-medium mb-2 ml-1">Ends in:</p>
						<div className="bg-gray50 rounded-xl px-5 rounded-xl">
							<RaffleCardTimer startTime={prize.startTime} FinishTime={prize.endTime} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const PrizeTapContent = () => {
	const { selectNewOffer, handleSelectNewOffer } = usePrizeOfferFormContext();
	const prizeCardsInfos = [
		{
			chianName: 'Polygon',
			chainIcon: 'assets/images/provider-dashboard/ic_polygon.svg',
			amount: '1.00 ETH',
			creator: 'BEIGI',
			spots: '30',
			startTime: '20 Januray 2023 12:00 PM UTC',
			endTime: '30 March 2023 12:00 PM UTC',
			status: 'Ongoing',
			imageSrc: 'assets/images/provider-dashboard/ethIcon.png',
		},
		{
			chianName: 'Polygon',
			chainIcon: 'assets/images/provider-dashboard/ic_polygon.svg',
			amount: '1.00 ETH',
			creator: 'BEIGI',
			spots: '',
			startTime: '20 Januray 2023 12:00 PM UTC',
			endTime: '30 March 2023 12:00 PM UTC',
			status: 'Verified',
			imageSrc: 'assets/images/provider-dashboard/ethIcon.png',
		},
		{
			chianName: 'Polygon',
			chainIcon: 'assets/images/provider-dashboard/ic_polygon.svg',
			amount: '1.00 ETH',
			creator: 'BEIGI',
			spots: '',
			startTime: '20 Januray 2023 12:00 PM UTC',
			endTime: '30 March 2023 12:00 PM UTC',
			status: 'Rejected',
			imageSrc: 'assets/images/provider-dashboard/ethIcon.png',
		},
	];

	return (
		<div>
			{!selectNewOffer ? (
				<div>
					<div className="flex flex-col md:flex-row  items-center justify-between ">
						<SearchInput className="w-full md:w-1/3" />
						<div className="provider-dashboard__status justify-center mt-5 md:mt-0 flex h-[40px] text-[12px] items-center align-center text-gray90 bg-gray40 border-2 border-gray30 rounded-xl w-full  md:w-auto">
							<div>All</div>
							<div>ongoing</div>
							<div>verified</div>
							<div>rejected</div>
							<div>finished</div>
						</div>
					</div>
					<div className="refill-token h-auto md:h-[78px] mt-5 flex w-full justify-between overflow-hidden items-center">
						<div className="flex flex-col sm:flex-row justify-between w-full items-center py-5 px-7 text-white">
							<div className="flex items-center relative">
								<div>
									<p className="text-[16px] font-semibold">Offer a New Prize</p>{' '}
									<p className="text-[14px] text-gray100">Here you can provide a NFT or Token for Prize Tap.</p>
								</div>
								<Icon
									className="absolute left-0 sm:right-[-45px] top-[-17px]  h-[150px] sm:h-[80px]"
									iconSrc="assets/images/provider-dashboard/prize-bg.png"
								/>
							</div>
							<div
								onClick={() => handleSelectNewOffer(true)}
								className="flex mt-5 z-[900] sm:mt-0 items-center justify-center cursor-pointer border-2 border-white rounded-[12px] bg-[#0C0C17] w-[226px] h-[46px]"
							>
								+ Provide a New Prize
							</div>
						</div>
					</div>
					<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
						{prizeCardsInfos.map((item, index) => (
							<PrizeCard key={index} prize={item} />
						))}
					</div>
				</div>
			) : (
				<OfferPrizeForm />
			)}
		</div>
	);
};

export default PrizeTapContent;
