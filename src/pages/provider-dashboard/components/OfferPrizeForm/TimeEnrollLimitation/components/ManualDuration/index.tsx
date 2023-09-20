import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useState } from 'react';
import { ErrorProps } from 'types';

interface ManualDurationProp {
	showErrors: ErrorProps | null;
}

const dateNames = [{ date: 'Day' }, { date: 'Week' }, { date: 'Month' }];

const ManualDuration = ({ showErrors }: ManualDurationProp) => {
	const [showItems, setShowItems] = useState<boolean>(false);
	const { data, handleChange, handleSelectDurationUnitTime } = usePrizeOfferFormContext();

	const handleSelectDurationDropDown = (unit: string) => {
		setShowItems(false);
		handleSelectDurationUnitTime(unit);
	};

	return (
		<div className=" w-full">
			<div className="flex gap-2 items-center text-gray100 text-[14px] cursor-pointer max-w-[200px]">
				<Icon iconSrc="assets/images/provider-dashboard/check-true.svg" />
				<p>Set Duration Manually</p>
			</div>
			<div className="relative">
				<div className="mt-2 px-5 items-center flex border border-gray50 rounded-xl h-[44px] bg-gray40">
					<input
						type="number"
						placeholder="Number of"
						className="provider-dashboard-input text-[12px]"
						name="numberOfDuration"
						onChange={handleChange}
						value={data.numberOfDuration ? data.numberOfDuration : ''}
					/>
					<div className="relative">
						<div
							onClick={() => {
								setShowItems(!showItems);
							}}
							className='cursor-pointer flex items-center justify-between rounded-[6px] p-1 px-2 bg-gray40 border border-gray70 w-[90px] text-white text-[12px] font-medium"'
						>
							<p className="text-[14px]">{data.durationUnitTime}</p>
							<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" width="14px" height="8px" />
						</div>
						{showItems && (
							<div className="text-[12px] z-[9999] text-white font-medium flex flex-col gap-1 absolute bg-gray40 border border-gray60 rounded-xl w-[90px] p-1">
								{dateNames.map((date, index) => (
									<p
										key={index}
										onClick={() => handleSelectDurationDropDown(date.date)}
										className=" flex pl-1 items-center hover:bg-gray70 h-[27px] cursor-pointer w-full rounded-[4px]"
									>
										{date.date}
									</p>
								))}
							</div>
						)}
					</div>
				</div>
				{showErrors && !showErrors.numberOfDurationStatus}
				<p className="text-error text-[10px] m-0 p-0 absolute left-1">{showErrors?.numberOfDurationMessage}</p>
			</div>
		</div>
	);
};

export default ManualDuration;
