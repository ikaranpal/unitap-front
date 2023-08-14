import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ProviderDashboardButtonNext, ProviderDashboardButtonPrevious } from 'components/basic/Button/button';
import { useState } from 'react';

interface PrizeInfoProp {
	handleChangeFormPagePrev: (page: number) => void;
	handleChangeFormPageNext: (page: number) => void;
}

const TimeEnrollLimitation = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const {
		data,
		handleChange,
		handleSelectLimitEnrollPeopleCheck,
		handleSetDurationManually,
		page,
		canGoStepThree,
		handleSetDuration,
		setDuration,
		handleSelectDurationUnitTime,
	} = usePrizeOfferFormContext();

	const [showItems, setShowItems] = useState<boolean>(false);

	const [showErrors, setShowErrors] = useState<boolean>(false);

	const handleNextPage = () => {
		// const res = canGoStepThree();
		// if (res != null && res) {
		// setShowErrors(false);
		handleChangeFormPageNext(page);
		// } else {
		// 	setShowErrors(true);
		// }
	};

	const handleSelectDurationDropDown = (unit: string) => {
		setShowItems(false);
		handleSelectDurationUnitTime(unit);
	};

	return (
		<div className="flex flex-col gap-4 w-full items-center max-w-[452px]">
			<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px] overflow-hidden">
				<p className="text-gray100 text-[12px] w-full max-w-[148px] bg-gray30 h-full flex items-center justify-center">
					Start Date & Time
				</p>
				<input
					type="text"
					placeholder="23/07/2023 - 09:00:00"
					className="provider-dashboard-input"
					name="startTime"
					onChange={handleChange}
					value={data.startTime ? data.startTime : ''}
				/>
			</div>
			<div className="w-full justify text-gray100 text-[12px] flex overflow-hidden bg-gray30 border border-gray50 rounded-xl h-[44px] items-center">
				<div
					onClick={() => handleSetDuration(false)}
					className={`w-full cursor-pointer border-r-2 border-r-gray50 h-[100%] flex items-center justify-center ${
						!setDuration ? 'bg-gray40 text-white' : ''
					}`}
				>
					Set End Date & Time
				</div>
				<div
					onClick={() => handleSetDuration(true)}
					className={`w-full cursor-pointer  h-[100%] flex items-center justify-center ${
						setDuration ? 'bg-gray40 text-white' : ''
					}`}
				>
					Set Duration
				</div>
			</div>
			{!setDuration ? (
				<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px] overflow-hidden">
					<p className="text-gray100 text-[12px] w-full max-w-[148px] bg-gray30 h-full flex items-center justify-center">
						End Date & Time
					</p>
					<input
						type="text"
						placeholder="23/07/2023 - 09:00:00"
						className="provider-dashboard-input"
						name="endTime"
						onChange={handleChange}
						value={data.endTime ? data.endTime : ''}
					/>
				</div>
			) : (
				<div className=" w-full">
					<div
						onClick={handleSetDurationManually}
						className="flex gap-2 items-center text-gray100 text-[14px] cursor-pointer max-w-[200px]"
					>
						<Icon
							iconSrc={
								!data.setDuration
									? 'assets/images/provider-dashboard/checkbox.svg'
									: 'assets/images/provider-dashboard/check-true.svg'
							}
						/>
						<p>Set Duration Manually</p>
					</div>
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
								<p>{data.durationUnitTime}</p>
								<Icon iconSrc="assets/images/provider-dashboard/arrow-down.svg" width="14px" height="8px" />
							</div>
							{showItems && (
								<div className="text-[12px] z-[9999] text-white font-medium flex flex-col gap-1 absolute bg-gray40 border border-gray60 rounded-xl w-[90px] p-1">
									<p
										onClick={() => handleSelectDurationDropDown('Day')}
										className=" flex pl-1 items-center hover:bg-gray70 h-[27px] cursor-pointer w-full rounded-[4px]"
									>
										Day
									</p>
									<p
										onClick={() => handleSelectDurationDropDown('Week')}
										className=" flex pl-1 items-center hover:bg-gray70 h-[27px] cursor-pointer w-full rounded-[4px]"
									>
										Week
									</p>
									<p
										onClick={() => handleSelectDurationDropDown('Month')}
										className=" flex pl-1 items-center hover:bg-gray70 h-[27px] cursor-pointer w-full rounded-[4px]"
									>
										Month
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			)}

			<div className="text-gray80 text-[12px] w-full max-w-[452px]">
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
						onChange={handleChange}
						value={data.maximumNumberEnroll}
						disabled={data.limitEnrollPeopleCheck ? false : true}
					/>
				</div>
			</div>

			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
				<div className="flex flex-col sm:flex-row w-full gap-5">
					<ProviderDashboardButtonPrevious
						disabled={page == 0 ? true : false}
						className="w-full"
						onClick={() => handleChangeFormPagePrev(page)}
					>
						Previous
					</ProviderDashboardButtonPrevious>
					<ProviderDashboardButtonNext onClick={handleNextPage}>NEXT</ProviderDashboardButtonNext>
				</div>
			</div>
		</div>
	);
};

export default TimeEnrollLimitation;
