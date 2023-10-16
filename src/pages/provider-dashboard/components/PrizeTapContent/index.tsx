import {
	ProviderDashboardButton,
	ProviderDashboardButtonCheck,
	ProviderDashboardButtonRejected,
	ProviderDashboardButtonShowDetails,
	ProviderDashboardButtonSuccess,
	ProviderDashboardButtonVerifying,
} from 'components/basic/Button/button';
import Icon from 'components/basic/Icon/Icon';
import SearchInput from '../SearchInput/searchInput';
import OfferPrizeForm from '../OfferPrizeForm';
import { RaffleCardTimer } from 'pages/prize-tap/components/RafflesList/RafflesList';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { UserRafflesProps } from 'types';
import { useWeb3React } from '@web3-react/core';
import { useContext, useEffect, useState } from 'react';
import { UserProfileContext } from 'hooks/useUserProfile';
import PrizeInfoConnectModal from '../OfferPrizeForm/PrizeInfo/components/PrizeInfoConnectModal/PrizeInfoConnectModal';

interface PrizeCardProp {
	prize: UserRafflesProps;
}

enum RaffleStatus {
	ONGOING = 'Ongoing',
	PENDING = 'PENDING',
	VERIFIED = 'Verified',
	FINISHED = 'Finished',
	REJECTED = 'REJECTED',
	ALL = 'all',
}

const PrizeCard = ({ prize }: PrizeCardProp) => {
	return (
		<div className="bg-gray30 border-2 border-gray40 w-full  p-4 rounded-xl relative h-[512px] select-not">
			<div className="providePrize-item-container">
				<div className="providePrize__amountBox bg-gray20 border border-gray40 h-[288px] rounded-2xl flex flex-col items-center justify-center relative">
					<div className="providePrize__chainName absolute top-0 mt-2 w-full max-w-[100px] py-1 flex items-center justify-center bg-gray50 border border-gray70 rounded-[6px]">
						<Icon className="mr-2" iconSrc={prize.chain.logoUrl} width="15px" height="14px" />
						<p className="text-gray100 text-[10px] font-medium">on {prize.chain.chainName}</p>
					</div>
					<div className="providePrize__amount flex items-center gap-2" data-amount={prize.prizeName}>
						<p>{prize.prizeName}</p> <Icon iconSrc={prize.chain.logoUrl} width="25.8px" height="39.9px" />
					</div>
				</div>
				<div>
					<div className="providePrize_stats flex justify-between my-2">
						<div className="text-white text-[14px] font-medium">{prize.prizeName}</div>
						{prize.status === 'Ongoing' ? (
							<ProviderDashboardButton>
								<p>Ongoing...</p>
							</ProviderDashboardButton>
						) : prize.status === RaffleStatus.VERIFIED ? (
							<ProviderDashboardButtonSuccess>Verified</ProviderDashboardButtonSuccess>
						) : prize.status === RaffleStatus.PENDING ? (
							<ProviderDashboardButtonVerifying>Verifying</ProviderDashboardButtonVerifying>
						) : prize.status === RaffleStatus.FINISHED ? (
							<ProviderDashboardButtonVerifying>Finished</ProviderDashboardButtonVerifying>
						) : (
							<ProviderDashboardButtonRejected>Rejected</ProviderDashboardButtonRejected>
						)}
					</div>
					<div className="providePrize_creator text-[12px] text-gray90 font-medium">by {prize.creatorName}</div>
				</div>
				{prize.numberOfOnchainEntries ? (
					<div className="providePrize_Spots bg-gray50 rounded-xl text-[14px] font-medium text-white h-[48px] my-3 flex items-center justify-center">
						{prize.numberOfOnchainEntries} {prize.status === RaffleStatus.FINISHED ? ' Spots Enrolled' : ' Spots Left'}
					</div>
				) : null}
				{prize.status === RaffleStatus.REJECTED ? (
					<div className="providePrize_timer absolute bottom-3 right-4 left-4">
						<ProviderDashboardButtonCheck>Check For Reasons</ProviderDashboardButtonCheck>
					</div>
				) : prize.status === RaffleStatus.PENDING ? (
					<div className="providePrize_timer absolute bottom-3 right-4 left-4">
						<ProviderDashboardButtonShowDetails>Show Details</ProviderDashboardButtonShowDetails>
					</div>
				) : (
					<div className="providePrize_timer absolute bottom-3 right-4 left-4">
						<p className="text-white font-medium text-[8px] font-medium mb-2 ml-1">
							{Date.now() < new Date(prize.startAt).getTime() ? 'Starts in:' : 'Ends in:'}
						</p>
						<div className="bg-gray50 rounded-xl px-5 rounded-xl">
							<RaffleCardTimer startTime={prize.startAt} FinishTime={prize.deadline} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const PrizeTapContent = () => {
	const { selectNewOffer, handleSelectNewOffer, userRaffles, userRafflesLoading } = usePrizeOfferFormContext();
	const { account } = useWeb3React();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const { userProfile } = useContext(UserProfileContext);

	const [selectedFilter, setSelectedFilter] = useState<string>(RaffleStatus.ALL);

	const [filteredRaffles, setFilteredRaffle] = useState<UserRafflesProps[]>([]);

	const handleSelectFilter = (filter: string) => {
		setSelectedFilter(filter);
	};

	useEffect(() => {
		setFilteredRaffle(
			selectedFilter && selectedFilter !== RaffleStatus.ALL
				? userRaffles.filter((item) => item.status == selectedFilter)
				: userRaffles,
		);
	}, [selectedFilter, userRaffles]);

	useEffect(() => {
		setIsOpen(!(userProfile && account));
	}, [account, userProfile]);

	return (
		<div>
			{!selectNewOffer && (
				<div>
					<div className="flex flex-col md:flex-row  items-center justify-between ">
						<SearchInput className="w-full md:w-1/3" />
						<div className="provider-dashboard__status select-not justify-center mt-5 md:mt-0 flex h-[40px] text-[12px] items-center align-center text-gray90 bg-gray40 border-2 border-gray30 rounded-xl w-full  md:w-auto">
							<div
								className={`${RaffleStatus.ALL == selectedFilter ? 'text-gray100' : ''}`}
								onClick={() => handleSelectFilter(RaffleStatus.ALL)}
							>
								All
							</div>
							<div
								className={`${RaffleStatus.ONGOING == selectedFilter ? 'text-gray100' : ''}`}
								onClick={() => handleSelectFilter(RaffleStatus.ONGOING)}
							>
								ongoing
							</div>
							<div
								className={`${RaffleStatus.VERIFIED == selectedFilter ? 'text-gray100' : ''}`}
								onClick={() => handleSelectFilter(RaffleStatus.VERIFIED)}
							>
								verified
							</div>
							<div
								className={`${RaffleStatus.REJECTED == selectedFilter ? 'text-gray100' : ''}`}
								onClick={() => handleSelectFilter(RaffleStatus.REJECTED)}
							>
								rejected
							</div>
							<div
								className={`${RaffleStatus.FINISHED == selectedFilter ? 'text-gray100' : ''}`}
								onClick={() => handleSelectFilter(RaffleStatus.FINISHED)}
							>
								finished
							</div>
						</div>
					</div>
					<div className="refill-token h-auto md:h-[78px] mt-4 flex w-full justify-between overflow-hidden items-center">
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
								className="flex mt-5 z-[10] sm:mt-0 items-center justify-center cursor-pointer border-2 border-white rounded-[12px] bg-[#0C0C17] w-[226px] h-[46px]"
							>
								+ Provide a New Prize
							</div>
						</div>
					</div>
					{filteredRaffles && filteredRaffles.length > 0 && (
						<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
							{filteredRaffles.map((item, index) => (
								<PrizeCard key={index} prize={item} />
							))}
						</div>
					)}
					{filteredRaffles?.length == 0 && !userRafflesLoading && (
						<div className="flex items-center justify-center mt-5 text-gray100">No items found</div>
					)}
					{filteredRaffles.length == 0 && userRafflesLoading && (
						<div className="flex items-center justify-center mt-5 text-gray100">Loading ...</div>
					)}
				</div>
			)}

			{selectNewOffer && <OfferPrizeForm />}

			<PrizeInfoConnectModal chain={null} isOpen={isOpen} />
		</div>
	);
};

export default PrizeTapContent;
