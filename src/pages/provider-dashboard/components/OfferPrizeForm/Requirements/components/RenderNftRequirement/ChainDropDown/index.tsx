import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useState } from 'react';
import { Chain } from 'types';

interface ChainDropDownProp {
	onSelectChain: (chain: Chain) => void;
	selectedChain: Chain | null;
}

const ChainDropDown = ({ onSelectChain, selectedChain }: ChainDropDownProp) => {
	const [showItems, setShowItems] = useState<boolean>(false);
	const { chainList } = usePrizeOfferFormContext();
	const handleSelectChain = (chain: Chain) => {
		onSelectChain(chain);
	};
	return (
		<div>
			<div
				onClick={() => setShowItems(!showItems)}
				className="flex cursor-pointer bg-gray40 text-[14px] h-[44px] border border-gray50 rounded-xl items-center justify-between px-3 mb-2"
			>
				<div className="flex items-center gap-2">
					{selectedChain ? <Icon iconSrc={selectedChain?.logoUrl} height="26px" width="26px" /> : null}
					<p>{selectedChain ? selectedChain?.chainName : 'Select Chain'}</p>
				</div>
				<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" />
			</div>

			{showItems && (
				<div className="absolute styled-scroll z-[9999999999] w-[390px] max-h-[205px] overflow-y-scroll bg-gray40 border border-gray40 rounded-xl mt-1 p-1 cursor-pointer">
					{chainList.map((chain, index) => (
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
	);
};

export default ChainDropDown;
