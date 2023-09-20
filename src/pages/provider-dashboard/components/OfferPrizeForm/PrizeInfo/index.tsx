import { useState } from 'react';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { PrizeInfoProp } from 'types';
import SelectChainDropDown from './components/SelectChainDropDown';
import SelectTokenDropDown from './components/SelectTokenDropDown';
import Pagination from '../../PagInation';

export const PrizeInfoDescription = {
	id: 0,
	prevIcon: 'assets/images/provider-dashboard/prizerForm-step-diamond-green.svg',
	activeIcon: 'assets/images/provider-dashboard/prizeForm-step-diamond.png',
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
		<div className="flex flex-col select-not gap-4 w-full items-center max-w-[452px]">
			<section className="w-full relative">
				<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] pr-4 items-center justify-between overflow-hidden w-full max-w-[452px]">
					<div className="bg-gray30 flex h-full w-full max-w-[148px] items-center items-center justify-center">
						<p>Provider</p>
					</div>
					<input
						type="text"
						placeholder="will be shown on card"
						className="provider-dashboard-input"
						name="provider"
						onChange={handleChange}
						value={data.provider ? data.provider : ''}
					/>
					<p>{data.provider?.length}/30</p>
				</div>
				{showErrors && !data.provider && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>}
			</section>

			<section className="w-full relative">
				<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[64px] items-center justify-between pr-4 w-full max-w-[452px] overflow-hidden">
					<div className="bg-gray30 flex h-full w-full max-w-[148px] items-center items-center justify-center">
						<p>Description</p>
					</div>
					<input
						type="text"
						placeholder="will be shown on card"
						className="provider-dashboard-input"
						name="description"
						onChange={handleChange}
						value={data.description ? data.description : ''}
					/>
					<p>{data.description?.length}/100</p>
				</div>
				{showErrors && !data.description && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>}
			</section>

			<section className="flex text-gray80 text-[12px] bg-gray30 border border-gray50 rounded-[12px] h-[44px] items-center w-full max-w-[452px] overflow-hidden">
				<div
					className={`${
						!data.isNft ? 'text-white font-medium bg-gray40 border-gray50' : ''
					} flex cursor-pointer items-center justify-center border-r border-r-gray50 w-[50%] h-full `}
					onClick={() => handleSelectTokenOrNft(false)}
				>
					Token
				</div>
				<div
					className={`${
						data.isNft ? 'text-white font-medium  bg-gray40 border-gray50' : ''
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
