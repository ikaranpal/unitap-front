import Icon from 'components/basic/Icon/Icon';
import { useState } from 'react';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ProviderDashboardButtonNext, ProviderDashboardButtonPrevious } from 'components/basic/Button/button';

import { PrizeInfoProp } from 'types';

const PrizeInfo = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const {
		data,
		handleChange,
		handleSelectTokenOrNft,
		chainList,
		selectedChain,
		chainName,
		handleSearchChain,
		filterChainList,
		handleSelectChain,
		page,
		canGoStepTwo,
	} = usePrizeOfferFormContext();

	const [showErrors, setShowErrors] = useState<boolean>(false);

	const handleNextPage = () => {
		const res = canGoStepTwo();
		if (res != null && res) {
			setShowErrors(false);
			handleChangeFormPageNext(page);
		} else {
			setShowErrors(true);
		}
	};

	const [showItems, setShowItems] = useState<boolean>(false);

	return (
		<div className="flex flex-col gap-4 w-full items-center max-w-[452px] min-w-[300px]">
			<div className="w-full relative">
				<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between px-4 w-full max-w-[452px]">
					<input
						type="text"
						placeholder="Provider (will be shown on card)"
						className="provider-dashboard-input"
						name="provider"
						onChange={handleChange}
						value={data.provider ? data.provider : ''}
					/>
					<p>{data.provider?.length}/10</p>
				</div>
				{showErrors && !data.provider && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Require</p>}
			</div>
			<div className="w-full relative">
				<div className="flex gap-4 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[64px] items-center justify-between px-4 w-full max-w-[452px]">
					<input
						type="text"
						placeholder="Description (will be shown on card)"
						className="provider-dashboard-input"
						name="description"
						onChange={handleChange}
						value={data.description ? data.description : ''}
					/>
					<p>{data.description?.length}/100</p>
				</div>
				{showErrors && !data.description && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Require</p>}
			</div>
			<div className="flex text-gray80 text-[12px] bg-gray40 border border-gray30 rounded-[12px] h-[44px] items-center w-full max-w-[452px] overflow-hidden">
				<div
					className={`${
						!data.isNft ? 'text-white font-medium' : ''
					} flex cursor-pointer items-center justify-center border-r border-r-gray50 w-[50%] h-full `}
					onClick={() => handleSelectTokenOrNft(false)}
				>
					Token
				</div>
				<div
					className={`${
						data.isNft ? 'text-white font-medium' : ''
					} flex cursor-pointer items-center justify-center border-l border-l-gray50 w-[50%] h-full`}
					onClick={() => handleSelectTokenOrNft(true)}
				>
					NFT
				</div>
			</div>
			<div className="w-full relative">
				<div className="w-full relative cursor-pointer">
					<div
						onClick={() => setShowItems(!showItems)}
						className="w-full flex items-center px-5 bg-gray40 border border-gray50 rounded-xl h-[44px]"
					>
						{selectedChain?.logoUrl ? <Icon iconSrc={selectedChain.logoUrl} width="24px" /> : null}
						<input
							className="w-full bg-transparent text-white px-2"
							type="text"
							value={chainName ? chainName : ''}
							placeholder="Search for Chain"
							onChange={handleSearchChain}
						/>
						<Icon
							iconSrc={
								!showItems ? 'assets/images/fund/arrow-down.png' : 'assets/images/provider-dashboard/arrow-top.svg'
							}
							width="14px"
							height="auto"
						></Icon>
					</div>
					{showItems && (
						<div className="absolute styled-scroll z-[9999999999] w-full max-h-[205px] overflow-y-scroll bg-gray40 border border-gray40 rounded-xl mt-1 p-1 cursor-pointer">
							{filterChainList.length == 0
								? chainList.map((chain, index) => (
										<div
											key={index}
											onClick={() => {
												setShowItems(false);
												handleSelectChain(chain);
											}}
											className="flex w-full items-center gap-2 text-white text-[14px] h-[46px] px-2 hover:bg-gray70 rounded-xl"
										>
											<Icon iconSrc={chain.logoUrl} width="24px" />
											<p>{chain.chainName}</p>
										</div>
								  ))
								: filterChainList.map((chain, index) => (
										<div
											key={index}
											onClick={() => {
												setShowItems(false);
												handleSelectChain(chain);
											}}
											className="flex w-full items-center gap-2 text-white text-[14px] h-[46px] px-2 hover:bg-gray70 rounded-xl"
										>
											<Icon iconSrc={chain.logoUrl} width="24px" />
											<p>{chain.chainName}</p>
										</div>
								  ))}
						</div>
					)}
				</div>
				{showErrors && !data.selectedChain && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Require</p>}
			</div>
			<div className="flex bg-gray40 gap-2 border border-gray50 rounded-[12px] w-full max-w-[452px] py-3 pr-3 overflow-hidden h-[44px] items-center">
				<div className="flex bg-gray30 items-center justify-center gap-4 px-2 min-w-[85px] h-[44px]">
					<Icon iconSrc={'/assets/images/provider-dashboard/btc.svg'} height="24px" width="24px" />
					<Icon iconSrc={'/assets/images/provider-dashboard/arrow-down.svg'} height="14px" width="8px" />
				</div>
				<input
					placeholder="Enter amount"
					className="bg-transparent text-gray80 placeholder-gray80 text-[14px] w-full"
				/>
				<div className="flex items-center justify-center text-gray100 text-[12px] bg-gray20 border border-gray100 rounded-[8px] h-[28px] w-[52px]">
					Max
				</div>
			</div>

			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
				<div className="flex flex-col sm:flex-row w-full gap-5">
					<ProviderDashboardButtonPrevious
						disabled={page == 0 ? true : false}
						className="w-full"
						onClick={() => handleChangeFormPagePrev(page)}
					>
						Previous
					</ProviderDashboardButtonPrevious>
					<ProviderDashboardButtonNext onClick={handleNextPage}>NEXT</ProviderDashboardButtonNext>
				</div>
			</div>
		</div>
	);
};

export default PrizeInfo;
