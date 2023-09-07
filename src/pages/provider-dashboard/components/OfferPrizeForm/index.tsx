import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import PrizeInfo, { PrizeInfoDescription } from './PrizeInfo';
import TimeEnrollLimitation from './TimeEnrollLimitation';
import Requirements from './Requirements';
import ContactInformation from './ContactInformation';
import DepositPrize from './DepositPrize';
import InformationVerification from './InformationVerification';
import { useState } from 'react';
import { Chain } from 'types';
import DisplaySteps from './DisplaySteps';

export const usePagination = () => {
	const { page, setPage } = usePrizeOfferFormContext();

	const nextPage = () => page <= 5 && setPage(page + 1);

	const prevPage = () => page > 0 && setPage(page - 1);

	const Form = getForm(page);

	const display = <Form handleChangeFormPagePrev={prevPage} handleChangeFormPageNext={nextPage} />;

	return { page, display };
};

interface PrizeInfoProps {
	provider: string;
	description: string;
	isNft: boolean;
	chain: Chain | null;
}

const getForm = (page: number) =>
	[PrizeInfo, TimeEnrollLimitation, Requirements, ContactInformation, DepositPrize, InformationVerification][page];

const OfferPrizeForm = () => {
	const { page, display } = usePagination();

	//create a new component for displaySteps
	return (
		<div className="flex flex-col md:flex-row gap-5">
			<DisplaySteps page={page} />
			<div className="offerPrize-form bg-gray20 w-full rounded-xl py-[4em] min-h-[504px] flex flex-col items-center px-5">
				<div className="w-full flex  justify-center min-h-[320px]">{display}</div>
			</div>
		</div>
	);
};

export default OfferPrizeForm;
