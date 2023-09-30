import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ErrorProps } from 'types';

interface PeopleLimitationProp {
	showErrors: ErrorProps | null;
}

const PeopleLimitation = ({ showErrors }: PeopleLimitationProp) => {
	const { data, handleChange, handleSelectLimitEnrollPeopleCheck } = usePrizeOfferFormContext();
	return (
		<div className="text-gray80 text-[12px] w-full max-w-[452px] relative">
			<div className="flex w-full gap-2 items-center cursor-pointer" onClick={handleSelectLimitEnrollPeopleCheck}>
				<Icon
					iconSrc={
						!data.limitEnrollPeopleCheck
							? '/assets/images/provider-dashboard/checkbox.svg'
							: '/assets/images/provider-dashboard/check-true.svg'
					}
					width="16px"
					height="16px"
					hoverable={true}
				/>
				<p className="text-gray100 text-[14px]">Also use maximum number of enrolling people limitation.</p>
			</div>
			<div
				className={`${
					data.limitEnrollPeopleCheck ? 'bg-gray40' : 'bg-gray30 opacity-[.5] '
				} h-[44px] rounded-xl px-3 mt-2`}
			>
				<input
					type="number"
					placeholder="Maximum Number of enrolling people"
					className="provider-dashboard-input"
					name="maximumNumberEnroll"
					min={0}
					onChange={handleChange}
					value={data.maximumNumberEnroll ? data.maximumNumberEnroll : ''}
					disabled={data.limitEnrollPeopleCheck ? false : true}
				/>
			</div>
			{showErrors && !showErrors.maximumLimitationStatus}
			<p className="text-error text-[10px] m-0 p-0 absolute left-1">{showErrors?.maximumLimitationMessage}</p>
		</div>
	);
};

export default PeopleLimitation;
