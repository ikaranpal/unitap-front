import React, { useEffect, useMemo, useState } from 'react';

import { Prize } from 'types';

import Navbar from 'components/common/Navbar/navbar';
import Header from './components/Header/header';
import Icon from 'components/basic/Icon/Icon';
import {
	ProviderDashboardButton,
	ProviderDashboardButtonCheck,
	ProviderDashboardButtonRejected,
	ProviderDashboardButtonSuccess,
} from 'components/basic/Button/button';
import Footer from 'components/common/Footer/footer';
import SearchInput from './components/SearchInput/searchInput';

const ProviderDashboard = () => {
	return (
		<div className="provider-dashboard">
			<Navbar />
			<div className="content-wrapper-provider-dashboard">
				<Header />
				<ProviderDashboardTabs />
				<PrizeTapContent />
				{/* <GasTapContent /> */}
			</div>
			<Footer />
		</div>
	);
};

const ProviderDashboardTabs = () => {
	const handleSelectTabs = () => {};
	return (
		<div className="mb-6 provider-dashboard__tabs flex bg-gray20 justify-between text-center text-gray80 font-semibold ">
			<div className="w-full p-3 flex gap-2 items-center cursor-pointer justify-center">
				Gas Tap Providers <Icon iconSrc="assets/images/provider-dashboard/gas-tap.svg" />
			</div>
			<div className="w-full p-3 flex gap-2 items-center cursor-pointer justify-center ">
				Token Tap Providers <Icon iconSrc="assets/images/provider-dashboard/token-tap.svg" />
			</div>
			<div className="w-full p-3 flex gap-2 items-center cursor-pointer justify-center">
				Prize Tap Providers <Icon iconSrc="assets/images/provider-dashboard/prize-tap.svg" />
			</div>
		</div>
	);
};

const GasTapContent = () => {
	return (
		<>
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
							<p className="text-[16px] font-semibold">Refill Token</p>{' '}
							<p className="text-[14px] text-gray100">Here you can provide Gas Fee.</p>
						</div>
						<Icon
							className="absolute right-0 sm:right-[-45px] top-[-17px]  h-[150px] sm:h-[80px]"
							iconSrc="assets/images/provider-dashboard/gas-bg.png"
							// height="80px"
						/>
					</div>
					<div className="flex mt-5 sm:mt-0 items-center justify-center cursor-pointer border-2 border-white rounded-[12px] bg-[#0C0C17] w-[226px] h-[46px]">
						+ Provide Gas Fee
					</div>
				</div>
			</div>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				<div className="bg-gray30 border-2 border-gray40 w-full  p-4 rounded-xl">
					<div className="flex justify-between items-center text-gray90">
						<div className="flex items-center text-white gap-2 font-medium text-[16px];">
							<Icon iconSrc="assets/images/provider-dashboard/ic_polygon.svg" />
							<p>Polygon</p>
						</div>
						<div className="flex gap-2 text-[10px] items-center justify-center">
							<div className="text-center w-[50px] bg-gray50 px-1 py-[3px] rounded-[6px]">EVM</div>
							<div className="text-center w-[50px] bg-gray50 px-1 py-[3px] rounded-[6px]">Mainnet</div>
						</div>
					</div>
					<div className="flex mt-4 justify-between items-center">
						<div className="text-gray90 text-[12px]">
							<div className="mb-2">
								Currency <span className="text-white ml-2"> Matic</span>
							</div>
							<div>
								Refill Amount <span className="text-white ml-2">2,137</span>
							</div>
						</div>
						<div>
							<ProviderDashboardButton data-testid={`chain-show-claim`} mlAuto className="text-sm m-auto">
								<p>Pending...</p>
							</ProviderDashboardButton>
						</div>
					</div>
				</div>

				<div className="bg-gray30 border-2 border-gray40 w-full  p-4 rounded-xl">
					<div className="flex justify-between items-center text-gray90">
						<div className="flex items-center text-white gap-2 font-medium text-[16px];">
							<Icon iconSrc="assets/images/provider-dashboard/ic_polygon.svg" />
							<p>Polygon</p>
						</div>
						<div className="flex gap-2 text-[10px] items-center justify-center">
							<div className="text-center w-[50px] bg-gray50 px-1 py-[3px] rounded-[6px]">EVM</div>
							<div className="text-center w-[50px] bg-gray50 px-1 py-[3px] rounded-[6px]">Mainnet</div>
						</div>
					</div>
					<div className="flex mt-4 justify-between items-center">
						<div className="text-gray90 text-[12px]">
							<div className="mb-2">
								Currency <span className="text-white ml-2"> Matic</span>
							</div>
							<div>
								Refill Amount <span className="text-white ml-2">2,137</span>
							</div>
						</div>
						<div>
							<ProviderDashboardButtonSuccess data-testid={`chain-show-claim`} mlAuto className="text-sm m-auto">
								<p>Done</p>
							</ProviderDashboardButtonSuccess>
						</div>
					</div>
				</div>

				<div className="bg-gray30 border-2 border-gray40 w-full  p-4 rounded-xl">
					<div className="flex justify-between items-center text-gray90">
						<div className="flex items-center text-white gap-2 font-medium text-[16px];">
							<Icon iconSrc="assets/images/provider-dashboard/ic_polygon.svg" />
							<p>Polygon</p>
						</div>
						<div className="flex gap-2 text-[10px] items-center justify-center">
							<div className="text-center w-[50px] bg-gray50 px-1 py-[3px] rounded-[6px]">EVM</div>
							<div className="text-center w-[50px] bg-gray50 px-1 py-[3px] rounded-[6px]">Mainnet</div>
						</div>
					</div>
					<div className="flex mt-4 justify-between items-center">
						<div className="text-gray90 text-[12px]">
							<div className="mb-2">
								Currency <span className="text-white ml-2"> Matic</span>
							</div>
							<div>
								Refill Amount <span className="text-white ml-2">2,137</span>
							</div>
						</div>
						<div>
							<ProviderDashboardButtonSuccess data-testid={`chain-show-claim`} mlAuto className="text-sm m-auto">
								<p>Done</p>
							</ProviderDashboardButtonSuccess>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

const TokenTapContent = () => {};

const PrizeTapContent = () => {
	const startTime = '20 Januray 2023 12:00 PM UTC';
	const FinishTime = '30 March 2023 12:00 PM UTC';
	return (
		<>
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
							className="absolute right-0 sm:right-[-45px] top-[-17px]  h-[150px] sm:h-[80px]"
							iconSrc="assets/images/provider-dashboard/gas-bg.png"
							// height="80px"
						/>
					</div>
					<div className="flex mt-5 sm:mt-0 items-center justify-center cursor-pointer border-2 border-white rounded-[12px] bg-[#0C0C17] w-[226px] h-[46px]">
						+ Provide a New Prize
					</div>
				</div>
			</div>
			<div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
				<div className="bg-gray30 border-2 border-gray40 w-full  p-4 rounded-xl relative h-[512px]">
					<div className="providePrize-item-container">
						<div className="providePrize__amountBox bg-gray20 border border-gray40 h-[288px] rounded-2xl flex flex-col items-center justify-center relative">
							<div className="providePrize__chainName absolute top-0 mt-2 w-full max-w-[100px] py-1 flex items-center justify-center bg-gray50 border border-gray70 rounded-[6px]">
								<Icon
									className="mr-2"
									iconSrc="assets/images/provider-dashboard/ic_polygon.svg"
									width="15px"
									height="14px"
								/>
								<p className="text-gray100 text-[10px] font-medium">on Polygon</p>
							</div>
							<div className="providePrize__amount">1.00 ETH</div>
						</div>
						<div>
							<div className="providePrize_stats flex justify-between my-2">
								<div className="text-white text-[14px] font-medium">1.00 ETH</div>
								<ProviderDashboardButton>Ongoing...</ProviderDashboardButton>
							</div>
							<div className="providePrize_creator text-[12px] text-gray90 font-medium">by BEIGI</div>
						</div>
						<div className="providePrize_Spots bg-gray50 rounded-xl text-[14px] font-medium text-white h-[48px] my-3 flex items-center justify-center">
							30 Spots Left
						</div>
						<div className="providePrize_timer absolute bottom-3 right-4 left-4">
							<p className="text-white font-medium text-[8px] mb-2">Ends in:</p>
							<PrizeCardTimer startTime={startTime} FinishTime={FinishTime} />
						</div>
					</div>
				</div>

				<div className="bg-gray30 border-2 border-gray40 w-full p-4 rounded-xl relative">
					<div className="providePrize-item-container">
						<div className="providePrize__amountBox bg-gray20 border border-gray40 h-[288px] rounded-2xl flex flex-col items-center justify-center relative">
							<div className="providePrize__chainName absolute top-0 mt-2 w-full max-w-[100px] py-1 flex items-center justify-center bg-gray50 border border-gray70 rounded-[6px]">
								<Icon
									className="mr-2"
									iconSrc="assets/images/provider-dashboard/ic_polygon.svg"
									width="15px"
									height="14px"
								/>
								<p className="text-gray100 text-[10px] font-medium">on Polygon</p>
							</div>
							<div className="providePrize__amount">1.00 ETH</div>
						</div>
						<div className="min-h-[120px]">
							<div className="providePrize_stats flex justify-between my-2">
								<div className="text-white text-[14px] font-medium">1.00 ETH</div>
								<ProviderDashboardButtonSuccess>Verified</ProviderDashboardButtonSuccess>
							</div>
							<div className="providePrize_creator text-[12px] text-gray90 font-medium ">by BEIGI</div>
						</div>
						<div className="providePrize_timer absolute bottom-3 right-4 left-4">
							<p className="text-white font-medium text-[8px] mb-2">Starts in:</p>
							<PrizeCardTimer startTime={startTime} FinishTime={FinishTime} />
						</div>
					</div>
				</div>

				<div className="bg-gray30 border-2 border-gray40 w-full  p-4 rounded-xl relative">
					<div className="providePrize-item-container">
						<div className="providePrize__amountBox bg-gray20 border border-gray40 h-[288px] rounded-2xl flex flex-col items-center justify-center relative">
							<div className="providePrize__chainName absolute top-0 mt-2 w-full max-w-[100px] py-1 flex items-center justify-center bg-gray50 border border-gray70 rounded-[6px]">
								<Icon
									className="mr-2"
									iconSrc="assets/images/provider-dashboard/ic_polygon.svg"
									width="15px"
									height="14px"
								/>
								<p className="text-gray100 text-[10px] font-medium">on Polygon</p>
							</div>
							<div className="providePrize__amount">1.00 ETH</div>
						</div>
						<div className="min-h-[120px]">
							<div className="providePrize_stats flex justify-between my-2">
								<div className="text-white text-[14px] font-medium">1.00 ETH</div>
								<ProviderDashboardButtonRejected>Rejected</ProviderDashboardButtonRejected>
							</div>
							<div className="providePrize_creator text-[12px] text-gray90 font-medium">by BEIGI</div>
						</div>
						<div className="providePrize_timer absolute bottom-3 right-4 left-4">
							<ProviderDashboardButtonCheck>Check For Reasons</ProviderDashboardButtonCheck>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

type PrizeCardTimerProps = {
	startTime: string;
	FinishTime: string;
};

const PrizeCardTimer = ({ startTime, FinishTime }: PrizeCardTimerProps) => {
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
		// calculate time difference between now and deadline
		const diff = deadline.getTime() - now.getTime();
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
		<div className="prize-card__timer flex bg-gray50 items-center justify-between rounded-xl gap-2 px-3 py-2 h-[48px]">
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-gray100 font-semibold">{days}</p>
				<p className="prize-card__timer-item-label text-gray90">d</p>
			</div>
			<p className="text-sm text-gray100">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-gray100 font-semibold">{hours}</p>
				<p className="prize-card__timer-item-label text-gray90">h</p>
			</div>
			<p className="text-sm text-gray100">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-gray100 font-semibold">{minutes}</p>
				<p className="prize-card__timer-item-label text-gray90">m</p>
			</div>
			<p className="text-sm text-gray100">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-gray100 font-semibold">{seconds}</p>
				<p className="prize-card__timer-item-label text-gray90">s</p>
			</div>
		</div>
	);
};

export default ProviderDashboard;
