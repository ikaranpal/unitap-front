import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useState } from 'react';
import { ErrorProps, ProviderFormPaginationProp } from 'types';
import Pagination from '../../PagInation';
import StartDateComp from './components/StartDateComp';
import SetDuration from './components/SetDuration';
import EndDateComp from './components/EndDateComp';
import ManualDuration from './components/ManualDuration';
import PeopleLimitation from './components/PeopleLimitation';

export const TimeEnrollLimitationDescription = {
	id: 1,
	prevIcon: 'assets/images/provider-dashboard/step-1-green.svg',
	activeIcon: 'assets/images/provider-dashboard/step-1-active.svg',
	nextIcon: 'assets/images/provider-dashboard/step-1-off.svg',
	title: 'Time/Enrollment Limitation',
	description: 'Information of time and enrollment ',
};

const TimeEnrollLimitation = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: ProviderFormPaginationProp) => {
	const { page, canGoStepThree, setDuration } = usePrizeOfferFormContext();

	const [showErrors, setShowErrors] = useState<ErrorProps | null>(null);

	const handleNextPage = () => {
		const res: any = canGoStepThree();
		if (res.endDateStatus && res.startDateStatus && res.numberOfDurationStatus && res.maximumLimitationStatus) {
			setShowErrors(null);
			handleChangeFormPageNext();
		} else {
			setShowErrors(res);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<div className="flex flex-col min-h-[340px] gap-4 w-full items-center max-w-[452px]">
				<StartDateComp showErrors={showErrors} />
				<SetDuration />
				{!setDuration ? <EndDateComp showErrors={showErrors} /> : <ManualDuration showErrors={showErrors} />}
				<PeopleLimitation showErrors={showErrors} />
			</div>
			<Pagination handleChangeFormPagePrev={handleChangeFormPagePrev} handleNextPage={handleNextPage} page={page} />
		</div>
	);
};

export default TimeEnrollLimitation;
