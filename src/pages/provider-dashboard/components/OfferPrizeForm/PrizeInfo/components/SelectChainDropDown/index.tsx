import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useState } from 'react';

interface Prop {
	showErrors: boolean;
}

const SelectChainDropDown = ({ showErrors }: Prop) => {
	const { data, chainList, selectedChain, chainName, handleSearchChain, filterChainList, handleSelectChain } =
		usePrizeOfferFormContext();

	const [showItems, setShowItems] = useState(false);

	return (
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
					<div className="absolute styled-scroll z-[2] w-full max-h-[205px] overflow-y-scroll bg-gray40 border border-gray40 rounded-xl mt-1 p-1 cursor-pointer">
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
			{showErrors && !data.selectedChain && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>}
		</div>
	);
};

export default SelectChainDropDown;
