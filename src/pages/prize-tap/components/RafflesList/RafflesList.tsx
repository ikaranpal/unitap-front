import { FC, useEffect, useMemo, useState, useContext } from 'react';
import { Prize } from 'types';
import Icon from 'components/basic/Icon/Icon';
import { ClaimAndEnrollButton, ClaimPrizeButton, EnrolledButton } from 'components/basic/Button/button';
import { useLocation } from 'react-router-dom';
import { PrizeTapContext } from 'hooks/prizeTap/prizeTapContext';
import { UserProfileContext } from 'hooks/useUserProfile';
import styled from 'styled-components';
import { DV } from 'components/basic/designVariables';
import { getTxUrl, shortenAddress } from 'utils';
import Tooltip from 'components/basic/Tooltip';
import { numberWithCommas } from 'utils/numbers';

const Action = styled.div`
	display: flex;

	@media only screen and (max-width: ${DV.breakpoints.smallDesktop}) {
		flex-direction: column;
	}
`;

const RafflesList = () => {
	const location = useLocation();
	const { rafflesList, rafflesListLoading } = useContext(PrizeTapContext);
	const [highlightedPrize, setHighlightedPrize] = useState('');

	const prizesSortListMemo = useMemo(
		() =>
			rafflesList.sort((a, b) => {
				const lowerHighlightChainName = highlightedPrize.toLowerCase();

				if (a.name.toLowerCase() === lowerHighlightChainName) return -1;
				if (b.name.toLowerCase() === lowerHighlightChainName) return 1;

				return 0;
			}),
		[rafflesList, highlightedPrize],
	);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const highlightedPrize = urlParams.get('icebox');

		setHighlightedPrize(highlightedPrize || '');
	}, [location.search, setHighlightedPrize]);

	return (
		<div className="grid md:flex-row wrap w-full mb-4 gap-4">
			{rafflesListLoading && rafflesList.length === 0 && (
				<div style={{ color: 'white', textAlign: 'center' }} data-testid="chain-list-loading">
					Loading...
				</div>
			)}
			{!!prizesSortListMemo.length && (
				<div>
					<RaffleCard
						raffle={prizesSortListMemo[0]}
						isHighlighted={highlightedPrize.toLocaleLowerCase() === rafflesList[0].name.toLocaleLowerCase()}
					/>
				</div>
			)}

			{prizesSortListMemo.slice(1).map((rafflesList, index) => (
				<div key={index}>
					<RaffleCard key={rafflesList.pk} raffle={rafflesList} />
				</div>
			))}
		</div>
	);
};

const RaffleCard: FC<{ raffle: Prize; isHighlighted?: boolean }> = ({ raffle, isHighlighted }) => {
	const {
		imageUrl,
		tokenUri,
		creatorUrl,
		twitterUrl,
		discordUrl,
		creatorName,
		description,
		startAt,
		deadline,
		name,
		chain,
		isExpired,
		numberOfOnchainEntries,
		maxNumberOfEntries,
		isPrizeNft,
		userEntry,
		winnerEntry,
		prizeSymbol,
		decimals,
		prizeAmount,
		creatorProfile,
	} = raffle;

	const creator = creatorName || creatorProfile?.username;

	const { openEnrollModal } = useContext(PrizeTapContext);
	const { userProfile } = useContext(UserProfileContext);
	const calculateClaimAmount = prizeAmount / 10 ** decimals;
	const remainingPeople = maxNumberOfEntries - numberOfOnchainEntries;
	const isRemainingPercentLessThanTen = remainingPeople < (maxNumberOfEntries / 100) * 10;
	const [start, setStarted] = useState<boolean>(true);
	const [showAllPermissions, setShowAllPermissions] = useState(false);

	useEffect(() => {
		setStarted(new Date(startAt) < new Date());
	}, [new Date()]);
	const getWinnerWallet = () => {
		if (!winnerEntry) return;
		let wallet = winnerEntry.userProfile.wallets.filter((item) => item.walletType === 'EVM');
		return wallet[0].address;
	};

	let tokenImgLink: string | undefined = tokenUri
		? `https://ipfs.io/ipfs/QmYmSSQMHaKBByB3PcZeTWesBbp3QYJswMFZYdXs1H3rgA/${Number(tokenUri.split('/')[3]) + 1}.png`
		: undefined;

	const prizeLink = isPrizeNft
		? imageUrl
			? imageUrl
			: tokenImgLink
		: `https://etherscan.io/address/${raffle.prizeAsset}`;

	const onPrizeClick = () => {
		if (prizeLink) window.open(prizeLink, '_blank');
	};

	return (
		<div className={`${isPrizeNft ? 'prize-card-bg-1' : 'prize-card-bg-2'} ${isHighlighted ? 'mb-20' : 'mb-4'}`}>
			<div className="flex flex-col lg:flex-row items-center justify-center gap-4 p-5 lg:p-0 rounded-xl bg-gray30 lg:bg-inherit">
				<div className="prize-card__image relative mb-3 lg:mb-0">
					<div className={isHighlighted ? 'before:!inset-[2px] p-[2px] gradient-outline-card' : ''}>
						<div
							className={`prize-card__container h-[212px] w-[212px] flex flex-col ${
								isHighlighted ? 'bg-g-primary-low ' : 'bg-gray30 border-2 border-gray40'
							} justify-center items-center p-5 rounded-xl`}
						>
							{(imageUrl || tokenImgLink) && (
								<img
									onClick={onPrizeClick}
									src={imageUrl ? imageUrl : tokenImgLink}
									alt={name}
									width={!isPrizeNft ? '168px' : ''}
									className={`${!isPrizeNft ? 'ml-1' : ''} cursor-pointer mb-2`}
								/>
							)}
							{/* {!isPrizeNft && (
								<div className="prize__amount" data-amount={calculateClaimAmount + '   ' + prizeSymbol}>
									{calculateClaimAmount + '  ' + prizeSymbol}
								</div>
							)} */}
						</div>
					</div>
					<div className="absolute bottom-[-10px] left-[40px] rounded-[6px] flex items-center bg-gray50 border-2 border-gray70 min-w-[130px] justify-center">
						<p className="text-gray100 text-[10px] p-1">on {chain.chainName}</p>
						<Icon iconSrc={chain.logoUrl} width="20px" height="16px" />
					</div>
				</div>
				<div className={isHighlighted ? 'before:!inset-[3px] p-[2px] gradient-outline-card w-full' : 'w-full'}>
					<div
						className={`card prize-card__content z-10 relative h-full md:max-h-[225px] md:min-h-[212px] ${
							isHighlighted ? 'bg-g-primary-low' : 'bg-gray30 border-2 border-gray40'
						} rounded-xl p-4 pt-3 flex flex-col w-full h-full`}
					>
						<span className="flex justify-between w-full mb-1">
							<p className="prize-card__title cursor-pointer text-white text-sm" onClick={onPrizeClick}>
								{name}
							</p>
							<div className="prize-card__links flex gap-4">
								{twitterUrl && (
									<Icon
										iconSrc="assets/images/prize-tap/twitter-logo.svg"
										onClick={() => window.open(twitterUrl, '_blank')}
										width="20px"
										height="16px"
										hoverable
									/>
								)}
								{discordUrl && (
									<Icon
										iconSrc="assets/images/prize-tap/discord-logo.svg"
										onClick={() => window.open(discordUrl, '_blank')}
										width="20px"
										height="16px"
										hoverable
									/>
								)}
							</div>
						</span>
						<span className="flex justify-between w-full mb-4">
							<p className="prize-card__source text-xs text-gray90">
								{!isPrizeNft ? (
									<span className="hover:cursor-pointer" onClick={() => window.open(creatorUrl, '_blank')}>
										by {creator}
									</span>
								) : (
									<span className="hover:cursor-pointer" onClick={() => window.open(creatorUrl, '_blank')}>
										by {creator}
									</span>
								)}
							</p>
						</span>
						<p className="prize-card__description text-gray100 text-xs leading-5 mb-2 grow shrink-0 basis-auto text-justify">
							{description}
						</p>

						{!winnerEntry && !userEntry?.txHash && !raffle.isExpired && (
							<span className="text-xs mb-3">
								<div className={`flex items-center flex-wrap text-xs gap-2 text-white`}>
									{(showAllPermissions
										? raffle.constraints
										: raffle.constraints.filter((permission) => permission.type === 'VER').slice(0, 6)
									).map((permission, key) => (
										<Tooltip
											onClick={openEnrollModal.bind(null, raffle, 'Verify')}
											className={
												'border-gray70 bg-gray50 hover:bg-gray10 transition-colors border px-3 py-2 rounded-lg '
											}
											data-testid={`token-verification-${raffle.id}-${permission.name}`}
											key={key}
											text={permission.description}
										>
											<div className="flex items-center gap-3">{permission.title}</div>
										</Tooltip>
									))}

									{raffle.constraints.length > 6 && (
										<button
											onClick={setShowAllPermissions.bind(null, !showAllPermissions)}
											className="border-gray70 flex items-center z-10 bg-gray60 transition-colors border px-3 py-2 rounded-lg"
										>
											<span>{showAllPermissions ? 'Show less' : 'Show more'}</span>
											<img
												alt="angle down"
												src="/assets/images/token-tap/angle-down.svg"
												className={`ml-2 ${showAllPermissions ? 'rotate-180' : ''} transition-transform`}
											/>
										</button>
									)}
								</div>
							</span>
						)}

						<Action className={'w-full sm:w-auto items-center sm:items-end '}>
							{(isExpired && !winnerEntry && !userEntry?.txHash) ||
							(!winnerEntry && !userEntry?.txHash && maxNumberOfEntries === numberOfOnchainEntries) ? (
								<span className="flex flex-col md:flex-row items-center justify-between w-full gap-4 ">
									<div className="flex flex-col sm:flex-row gap-4 justify-between w-full md:items-center bg-gray40 px-5 py-1 rounded-xl">
										<div className="flex flex-col gap-1">
											<p className="text-[10px] text-white">{start ? 'Winner in:' : 'Starts in:'}</p>
											<p className="text-[10px] text-gray100">
												{!isRemainingPercentLessThanTen
													? `
											${numberOfOnchainEntries} / ${numberWithCommas(maxNumberOfEntries)} people enrolled`
													: remainingPeople > 0
													? `${remainingPeople} people remains`
													: `${numberWithCommas(maxNumberOfEntries)} people enrolled`}
											</p>
										</div>
										<RaffleCardTimer startTime={startAt} FinishTime={deadline} />
									</div>
									<ClaimAndEnrollButton
										disabled={true}
										className="min-w-[552px] md:!w-[352px] !w-full"
										height="48px"
										fontSize="14px"
									>
										{' '}
										<div className="relative w-full">
											{maxNumberOfEntries === numberOfOnchainEntries ? <p> Full</p> : <p> Unavailable</p>}
											<Icon
												className="absolute right-0 top-[-2px]"
												iconSrc="assets/images/prize-tap/header-prize-logo.svg"
												width="27px"
												height="24px"
											/>
										</div>
									</ClaimAndEnrollButton>
								</span>
							) : !winnerEntry && !userEntry?.txHash ? (
								<span className="flex flex-col md:flex-row items-center justify-between w-full gap-4 ">
									<div className="flex flex-col sm:flex-row gap-4 justify-between w-full md:items-center bg-gray40 px-5 py-1 rounded-xl">
										<div className="flex flex-col gap-1">
											<p className="text-[10px] text-white">{start ? 'Winner in:' : 'Starts in:'}</p>
											<p className="text-[10px] text-gray100">
												{!isRemainingPercentLessThanTen
													? `
													${numberOfOnchainEntries} / ${numberWithCommas(maxNumberOfEntries)} people enrolled`
													: remainingPeople > 0
													? `${remainingPeople} people remains`
													: `${numberWithCommas(maxNumberOfEntries)} people enrolled`}
											</p>
										</div>
										<RaffleCardTimer startTime={startAt} FinishTime={deadline} />
									</div>
									<ClaimAndEnrollButton
										height="48px"
										fontSize="14px"
										disabled={!start}
										className="min-w-[552px] md:!w-[352px] !w-full"
										onClick={() => openEnrollModal(raffle, 'Verify')}
									>
										{' '}
										<div className="relative w-full">
											<p> Enroll</p>{' '}
											<Icon
												className="absolute right-0 top-[-2px]"
												iconSrc="assets/images/prize-tap/header-prize-logo.svg"
												width="27px"
												height="24px"
											/>
										</div>
									</ClaimAndEnrollButton>
								</span>
							) : !winnerEntry && userEntry?.txHash ? (
								<span className="flex flex-col md:flex-row items-center justify-between w-full gap-4 ">
									<div className="flex flex-col sm:flex-row gap-4 justify-between w-full md:items-center bg-gray40 px-5 py-1 rounded-xl">
										<div className="flex flex-col gap-1">
											<p className="text-[10px] text-white">{start ? 'Winner in:' : 'Starts in:'}</p>
											<p className="text-[10px] text-gray100">
												{!isRemainingPercentLessThanTen
													? `
													${numberOfOnchainEntries} / ${numberWithCommas(maxNumberOfEntries)} people enrolled`
													: remainingPeople > 0
													? `${remainingPeople} people remains`
													: `${numberWithCommas(maxNumberOfEntries)} people enrolled`}
											</p>
										</div>
										<RaffleCardTimer startTime={startAt} FinishTime={deadline} />
									</div>
									<EnrolledButton
										disabled={true}
										className="min-w-[552px] md:!w-[352px] !w-full"
										height="48px"
										fontSize="14px"
									>
										{' '}
										<div className="relative w-full">
											<p> Enrolled</p>{' '}
											<Icon
												className="absolute  right-0 top-[-2px]"
												iconSrc="assets/images/prize-tap/header-prize-logo.svg"
												width="27px"
												height="24px"
											/>
										</div>
									</EnrolledButton>
								</span>
							) : winnerEntry && winnerEntry?.userProfile.pk !== userProfile?.pk ? (
								<span className="winner overflow-hidden font-medium md:leading-[normal] leading-[15px] winner-box-bg flex h-[70px] md:h-[48px] w-full items-center bg-gray40 py-1 rounded-xl align-center justify-between">
									<p className="text-[10px] text-white pl-5 md:flex md:shrink-0 font-medium">
										Congratulations to{' '}
										<span className="mx-0 md:mx-1 font-normal">
											{' '}
											<span className="font-semibold">{'@' + winnerEntry?.userProfile?.username + ' '}</span> (
											<span>{shortenAddress(getWinnerWallet())}) wallet address</span>
										</span>{' '}
										for being the winner !
										{winnerEntry!.claimingPrizeTx && (
											<span
												className="flex md:ml-2 cursor-pointer"
												onClick={() => window.open(getTxUrl(chain, winnerEntry!.claimingPrizeTx), '_blank')}
											>
												View on Explorer
												<Icon className="ml-2" iconSrc="assets/images/prize-tap/ic_link_white.svg" hoverable={true} />
											</span>
										)}
									</p>
									<Icon
										className="opacity-[.3] mt-[-25px]  md:mt-[-10px] "
										iconSrc="assets/images/prize-tap/winner_bg_diamond.svg"
										width="215px"
										height="215px"
									/>
								</span>
							) : winnerEntry && winnerEntry?.userProfile.pk === userProfile?.pk && !userEntry?.claimingPrizeTx ? (
								<span className="flex flex-col md:flex-row items-center justify-between w-full gap-4 ">
									<div className="flex gap-4 overflow-hidden px-5 h-[48px] justify-between w-full items-center winner-box-bg  py-1 rounded-xl">
										<p className="text-[10px] text-white">
											Congratulations @{winnerEntry?.userProfile?.username} ! claim your prize now.
										</p>
										<Icon
											className="opacity-[.3] mt-[-10px] mr-[-20px]"
											iconSrc="assets/images/prize-tap/winner_bg_diamond.svg"
											width="215px"
											height="215px"
										/>
									</div>

									<ClaimPrizeButton
										height="48px"
										fontSize="14px"
										className="min-w-[552px] md:!w-[352px] !w-full"
										onClick={() => openEnrollModal(raffle, 'Claim')}
									>
										{' '}
										<div className="relative w-full text-gray10">
											<p> Claim Prize</p>{' '}
										</div>
									</ClaimPrizeButton>
								</span>
							) : (
								<span className="flex flex-col md:flex-row items-center justify-between w-full gap-4 ">
									<div className="flex gap-4 overflow-hidden pl-5 h-[48px] justify-between w-full items-center winner-box-bg  py-1 rounded-xl">
										<p className="text-[10px] text-white">Congratulations @{winnerEntry?.userProfile?.username}!</p>
										<Icon
											className="opacity-[.3] mt-[-10px]"
											iconSrc="assets/images/prize-tap/winner_bg_diamond.svg"
											width="215px"
											height="215px"
										/>
									</div>
									<div className="claimed-prize md:!w-[352px] !w-full">
										<div className="relative">
											<p>Claimed</p>
											<Icon
												className="absolute right-0 top-[-2px]"
												iconSrc="assets/images/prize-tap/header-prize-logo.svg"
												width="27px"
												height="24px"
											/>
										</div>
									</div>
								</span>
							)}
						</Action>
					</div>
				</div>
			</div>
		</div>
	);
};

type RaffleCardTimerProps = {
	startTime: string;
	FinishTime: string;
};

const RaffleCardTimer = ({ startTime, FinishTime }: RaffleCardTimerProps) => {
	const [now, setNow] = useState(new Date());
	const [days, setDays] = useState('00');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');
	const [start, setStarted] = useState<boolean>(true);

	useEffect(() => {
		setStarted(new Date(startTime) < new Date());
	}, [new Date()]);

	let startTimeDate = useMemo(() => new Date(startTime), [startTime]);
	let FinishTimeDate = useMemo(() => new Date(start ? FinishTime : new Date()), [FinishTime]);

	let deadline = useMemo(
		() => (startTimeDate.getTime() > now.getTime() ? startTimeDate : FinishTimeDate),
		[startTimeDate, FinishTimeDate, now],
	);

	useEffect(() => {
		// calculate time difference between now and deadline
		const diff = deadline.getTime() - now.getTime();
		if (diff <= 0) {
			return;
		}
		// time calculations for days, hours, minutes and seconds
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		// set the state with the time difference
		setSeconds(seconds < 10 ? `0${seconds}` : seconds.toString());
		setMinutes(minutes < 10 ? `0${minutes}` : minutes.toString());
		setHours(hours < 10 ? `0${hours}` : hours.toString());
		setDays(days < 10 ? `0${days}` : days.toString());
	}, [now, deadline]);

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="prize-card__timer flex items-center justify-between rounded-xl gap-4 md:px-3 py-2">
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-white font-semibold">{days}</p>
				<p className="prize-card__timer-item-label text-gray90">d</p>
			</div>
			<p className="text-sm text-white">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-white font-semibold">{hours}</p>
				<p className="prize-card__timer-item-label text-gray90">h</p>
			</div>
			<p className="text-sm text-white">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-white font-semibold">{minutes}</p>
				<p className="prize-card__timer-item-label text-gray90">m</p>
			</div>
			<p className="text-sm text-white">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-white font-semibold">{seconds}</p>
				<p className="prize-card__timer-item-label text-gray90">s</p>
			</div>
		</div>
	);
};

export const RaffleCardTimerLandingPage = ({ startTime, FinishTime }: RaffleCardTimerProps) => {
	const [now, setNow] = useState(new Date());
	const [days, setDays] = useState('00');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');

	let startTimeDate = useMemo(() => new Date(startTime), [startTime]);
	let FinishTimeDate = useMemo(() => new Date(FinishTime), [FinishTime]);

	let deadline = useMemo(
		() => (startTimeDate.getTime() > now.getTime() ? startTimeDate : FinishTimeDate),
		[startTimeDate, FinishTimeDate, now],
	);

	useEffect(() => {
		const diff = deadline.getTime() - now.getTime();
		if (diff <= 0) {
			return;
		}
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		setSeconds(seconds < 10 ? `0${seconds}` : seconds.toString());
		setMinutes(minutes < 10 ? `0${minutes}` : minutes.toString());
		setHours(hours < 10 ? `0${hours}` : hours.toString());
		setDays(days < 10 ? `0${days}` : days.toString());
	}, [now, deadline]);

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="prize-card__timer flex gap-1 md:px-1 mt-[-2px] text-gray100 items-center">
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value font-semibold">{days}</p>
			</div>
			<p className="text-sm">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value font-semibold">{hours}</p>
			</div>
			<p className="text-sm">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value font-semibold">{minutes}</p>
			</div>
			<p className="text-sm">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value font-semibold">{seconds}</p>
			</div>
		</div>
	);
};

export default RafflesList;
