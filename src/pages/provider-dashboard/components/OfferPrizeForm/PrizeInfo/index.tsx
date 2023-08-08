import Icon from 'components/basic/Icon/Icon';
import React, { useState } from 'react';
import Dropdown from '../../Dropdown/dropdown';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';

const PrizeInfo = () => {
	const { data, handleChange, handleSelectTokenOrNft } = usePrizeOfferFormContext();
	const chains = [
		{ name: 'Polygon', icon: 'assets/images/provider-dashboard/ic_polygon.svg' },
		{ name: 'Fantom', icon: '' },
		{ name: 'Binance Smart Chain', icon: '' },
		{ name: 'Gnosis', icon: '' },
		{ name: 'Telos', icon: '' },
		{ name: 'Gnosis', icon: '' },
		{ name: 'Telos', icon: '' },
	];

	interface SelectedChainProp {
		name: string;
		icon: string;
	}

	const [showItems, setShowItems] = useState<boolean>(false);
	const [selectedChain, setSelectedChain] = useState<SelectedChainProp>({ name: '', icon: '' });
	const handleSelectedChain = (chian: SelectedChainProp) => {
		setShowItems(false);
		setSelectedChain(chian);
	};
	return (
		<div className="flex flex-col gap-4 w-full items-center max-w-[452px] min-w-[300px]">
			<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between px-4 w-full max-w-[452px]">
				<input
					type="text"
					placeholder="Provider (will be shown on card)"
					className="bg-transparent placeholder-gray80 w-full"
					name="provider"
					onChange={handleChange}
					value={data.provider}
				/>
				<p>0/10</p>
			</div>
			<div className="flex gap-4 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[64px] items-center justify-between px-4 w-full max-w-[452px]">
				<input
					type="text"
					placeholder="Description (will be shown on card)"
					className="bg-transparent placeholder-gray80 w-full"
					name="description"
					onChange={handleChange}
					value={data.description}
				/>
				<p>0/100</p>
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
			{/* <div className="relative">
				<div className="flex text-gray80 text-[12px] bg-gray40 items-center w-full max-w-[452px] border border-gray50 rounded-[12px]">
					<Dropdown
						value={selectedChain!.name}
						icon={selectedChain!.icon}
						setShowItems={setShowItems}
						showItems={showItems}
					/>
				</div>
				{showItems && (
					<div className="chines-list-dropDown z-[9999] absolute w-full bg-gray40 border border-gray50 rounded-xl mt-1 text-white text-[14px] p-1 overflow-y-scroll max-h-[200px]">
						{chains.map((chain, index) => (
							<div
								onClick={() => handleSelectedChain(chain)}
								key={index}
								className="flex gap-1 hover:bg-gray70 m-1 cursor-pointer rounded-xl pl-2 h-[46px] items-center"
							>
								<Icon iconSrc={chain.icon} width="24px" height="21.517px" />
								<p>{chain.name}</p>
							</div>
						))}
					</div>
				)}
			</div> */}
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
		</div>
	);
};

// const PrizeInfoProviderInput = () => {
// 	return (
// 		<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between px-4 w-full max-w-[452px]">
// 			<input
// 				type="text"
// 				placeholder="Provider (will be shown on card)"
// 				className="bg-transparent placeholder-gray80 w-full"
// 			/>
// 			<p>0/10</p>
// 		</div>
// 	);
// };

// const PrizeInfoDescriptionInput = () => {
// 	return (
// 		<div className="flex gap-4 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[64px] items-center justify-between px-4 w-full max-w-[452px]">
// 			<input
// 				type="text"
// 				placeholder="Description (will be shown on card)"
// 				className="bg-transparent placeholder-gray80 w-full"
// 			/>
// 			<p>0/100</p>
// 		</div>
// 	);
// };

// const PrizeInfoSelectTokenOrNft = () => {
// 	return (
// 		<div className="flex text-gray80 text-[12px] bg-gray40 border border-gray30 rounded-[12px] h-[44px] items-center w-full max-w-[452px] overflow-hidden">
// 			<div className="flex items-center justify-center border-r border-r-gray50 w-[50%] h-full text-white font-medium">
// 				Token
// 			</div>
// 			<div className="flex items-center justify-center border-l border-l-gray50 w-[50%] h-full">NFT</div>
// 		</div>
// 	);
// };

// const PrizeInfoChainSelect = () => {
// 	const [showItems, setShowItems] = useState<boolean>(false);
// 	const [selectedChain, setSelectedChain] = useState<SelectedChainProp>({ name: '', icon: '' });
// 	const handleSelectedChain = (chian: SelectedChainProp) => {
// 		setShowItems(false);
// 		setSelectedChain(chian);
// 	};
// 	return (
// 		<div className="relative">
// 			<div className="flex text-gray80 text-[12px] bg-gray40 items-center w-full max-w-[452px] border border-gray50 rounded-[12px]">
// 				<Dropdown
// 					value={selectedChain!.name}
// 					icon={selectedChain!.icon}
// 					setShowItems={setShowItems}
// 					showItems={showItems}
// 				/>
// 			</div>
// 			{showItems && (
// 				<div className="chines-list-dropDown z-[9999] absolute w-full bg-gray40 border border-gray50 rounded-xl mt-1 text-white text-[14px] p-1 overflow-y-scroll max-h-[200px]">
// 					{chains.map((chain, index) => (
// 						<div
// 							onClick={() => handleSelectedChain(chain)}
// 							key={index}
// 							className="flex gap-1 hover:bg-gray70 m-1 cursor-pointer rounded-xl pl-2 h-[46px] items-center"
// 						>
// 							<Icon iconSrc={chain.icon} width="24px" height="21.517px" />
// 							<p>{chain.name}</p>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// const PrizeInfoEnterAmount = () => {
// 	return (
// 		<div className="flex bg-gray40 gap-2 border border-gray50 rounded-[12px] w-full max-w-[452px] py-3 pr-3 overflow-hidden h-[44px] items-center">
// 			<div className="flex bg-gray30 items-center justify-center gap-4 px-2 min-w-[85px] h-[44px]">
// 				<Icon iconSrc={'/assets/images/provider-dashboard/btc.svg'} height="24px" width="24px" />
// 				<Icon iconSrc={'/assets/images/provider-dashboard/arrow-down.svg'} height="14px" width="8px" />
// 			</div>
// 			<input placeholder="Enter amount" className="bg-transparent text-gray80 placeholder-gray80 text-[14px] w-full" />
// 			<div className="flex items-center justify-center text-gray100 text-[12px] bg-gray20 border border-gray100 rounded-[8px] h-[28px] w-[52px]">
// 				Max
// 			</div>
// 		</div>
// 	);
// };

export default PrizeInfo;
