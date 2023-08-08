import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';

const TimeEnrollLimitation = () => {
	const { data, handleChange, handleSelectLimitEnrollPeopleCheck } = usePrizeOfferFormContext();

	return (
		<div className="flex flex-col gap-4 w-full items-center max-w-[452px]">
			<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px] overflow-hidden">
				<p className="text-gray100 text-[12px] w-full max-w-[148px] bg-gray30 h-full flex items-center justify-center">
					Start Date & Time
				</p>
				<input
					type="text"
					placeholder="23/07/2023 - 09:00:00"
					className="bg-transparent placeholder-gray80 w-full"
					name="startTime"
					onChange={handleChange}
					value={data.startTime}
				/>
			</div>
			<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px] overflow-hidden">
				<p className="text-gray100 text-[12px] w-full max-w-[148px] bg-gray30 h-full flex items-center justify-center">
					End Date & Time
				</p>
				<input
					type="text"
					placeholder="23/07/2023 - 09:00:00"
					className="bg-transparent placeholder-gray80 w-full"
					name="endTime"
					onChange={handleChange}
					value={data.endTime}
				/>
			</div>
			<div className="flex w-full gap-2 items-center">
				<Icon
					iconSrc={
						!data.limitEnrollPeopleCheck
							? '/assets/images/provider-dashboard/checkbox.svg'
							: '/assets/images/provider-dashboard/check-true.svg'
					}
					width="16px"
					height="16px"
					hoverable={true}
					onClick={handleSelectLimitEnrollPeopleCheck}
				/>
				<p className="text-gray100 text-[14px]">Also use maximum number of enrolling people limitation.</p>
			</div>

			<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px] overflow-hidden px-4">
				<input
					type="text"
					placeholder="Maximum Number of enrolling people"
					className="bg-transparent placeholder-gray80 w-full"
					name="maximumNumberEnroll"
					onChange={handleChange}
					value={data.maximumNumberEnroll}
				/>
			</div>
		</div>
	);
};

export default TimeEnrollLimitation;
