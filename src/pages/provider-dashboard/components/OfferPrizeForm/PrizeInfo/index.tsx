import { useState } from 'react';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { PrizeInfoProp } from 'types';
import SelectChainDropDown from './components/SelectChainDropDown';
import SelectTokenDropDown from './components/SelectTokenDropDown';
import Pagination from '../../PagInation';

export const PrizeInfoDescription = {
	id: 0,
	prevIcon: 'assets/images/provider-dashboard/prizerForm-step-diamond-green.svg',
	activeIcon: 'assets/images/provider-dashboard/prizeForm-step-diamond.svg',
	nextIcon: 'assets/images/provider-dashboard/prizeForm-step-diamond.svg',
	title: 'Prize info',
	description: 'Your prize information',
};

const PrizeInfo = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const { data, handleChange, handleSelectTokenOrNft, page, canGoStepTwo } = usePrizeOfferFormContext();
	const [showErrors, setShowErrors] = useState<boolean>(false);

	const handleNextPage = () => {
		const res = canGoStepTwo();
		setShowErrors(!res);
		res && handleChangeFormPageNext();
	};

	return (
		<div className="flex flex-col gap-4 w-full items-center max-w-[452px] min-w-[300px]">
			<section className="w-full relative">
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
				{showErrors && !data.provider && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>}
			</section>

			<section className="w-full relative">
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
				{showErrors && !data.description && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>}
			</section>

			<section className="flex text-gray80 text-[12px] bg-gray40 border border-gray30 rounded-[12px] h-[44px] items-center w-full max-w-[452px] overflow-hidden">
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
			</section>

			<SelectChainDropDown showErrors={showErrors} />

			<SelectTokenDropDown />

			<Pagination handleChangeFormPagePrev={handleChangeFormPagePrev} handleNextPage={handleNextPage} page={page} />
		</div>
	);
};

export default PrizeInfo;
