import { useContext, useEffect, useState } from 'react';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ProviderFormPaginationProp } from 'types';
import SelectChainDropDown from './components/SelectChainDropDown';
import Pagination from '../../PagInation';
import SelectTokenOrNft from './components/SelectTokenOrNft';
import { useWeb3React } from '@web3-react/core';
import { UserProfileContext } from 'hooks/useUserProfile';
import PrizeInfoConnectModal from './components/PrizeInfoConnectModal/PrizeInfoConnectModal';

export const PrizeInfoDescription = {
	id: 0,
	prevIcon: 'assets/images/provider-dashboard/prizerForm-step-diamond-green.svg',
	activeIcon: 'assets/images/provider-dashboard/prizeForm-step-diamond.png',
	nextIcon: 'assets/images/provider-dashboard/prizeForm-step-diamond.svg',
	title: 'Prize info',
	description: 'Your prize information',
};

const PrizeInfo = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: ProviderFormPaginationProp) => {
	const { data, handleChange, page, canGoStepTwo } = usePrizeOfferFormContext();
	const [showErrors, setShowErrors] = useState<boolean>(false);
	const { account, chainId } = useWeb3React();
	const { userProfile } = useContext(UserProfileContext);
	const handleNextPage = () => {
		const res = canGoStepTwo();
		setShowErrors(!res);
		res && handleChangeFormPageNext();
	};

	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		// const isCorrectChian = !data.selectedChain?.chainId ? true : Number(data.selectedChain?.chainId) == chainId;
		const isCorrectChian = true;
		setIsOpen(!(userProfile && account && isCorrectChian));
	}, [account, userProfile, chainId, data.selectedChain?.chainId]);

	return (
		<div className="flex flex-col justify-center w-full items-center">
			<div className="flex flex-col select-not min-h-[340px] mb-5 gap-4 w-full items-center max-w-[452px]">
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
							disabled={!account && !userProfile}
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
							disabled={!account && !userProfile}
							value={data.description ? data.description : ''}
						/>
						<p>{data.description?.length}/100</p>
					</div>
					{showErrors && !data.description && <p className="text-error text-[8px] m-0 p-0 absolute left-1">Required</p>}
				</section>

				<SelectChainDropDown showErrors={showErrors} />
				<SelectTokenOrNft showErrors={showErrors} />
			</div>
			<Pagination handleChangeFormPagePrev={handleChangeFormPagePrev} handleNextPage={handleNextPage} page={page} />
			<PrizeInfoConnectModal chain={data.selectedChain ? data.selectedChain : null} isOpen={isOpen} />
		</div>
	);
};

export default PrizeInfo;
