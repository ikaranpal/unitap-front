import Icon from 'components/basic/Icon/Icon';
import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ProviderDashboardButtonNext, ProviderDashboardButtonPrevious } from 'components/basic/Button/button';

interface PrizeInfoProp {
	handleChangeFormPagePrev: (page: number) => void;
	handleChangeFormPageNext: (page: number) => void;
}

const TimeEnrollLimitation = ({ handleChangeFormPagePrev, handleChangeFormPageNext }: PrizeInfoProp) => {
	const { data, handleChange, handleSelectLimitEnrollPeopleCheck, page } = usePrizeOfferFormContext();

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

			<div className="flex gap-2  text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px] overflow-hidden px-4">
				<input
					type="number"
					placeholder="Maximum Number of enrolling people"
					className="provider-dashboard-input"
					name="maximumNumberEnroll"
					onChange={handleChange}
					value={data.maximumNumberEnroll}
				/>
			</div>

			<div className="flex flex-col lg:flex-row w-full max-w-[452px] mt-5 items-center ">
				{/* {page == 5 ? (
					<ProviderDashboardGoToDashBoard className="opacity-[.3]">Go To Dashboard</ProviderDashboardGoToDashBoard>
				) : ( */}
				<div className="flex flex-col sm:flex-row w-full gap-5">
					<ProviderDashboardButtonPrevious
						disabled={page == 0 ? true : false}
						className="w-full"
						onClick={() => handleChangeFormPagePrev(page)}
					>
						Previous
					</ProviderDashboardButtonPrevious>
					<ProviderDashboardButtonNext onClick={() => handleChangeFormPageNext(page)}>NEXT</ProviderDashboardButtonNext>
					{/* {page == 4 ? (
							<ProviderDashboardButtonSubmit className="text-[14px] md:text-[12px] lg:text-[14px] ">
								<p>Submit Contribution</p> */}
					{/* </ProviderDashboardButtonSubmit> */}
					{/* ) : ( */}

					{/* )} */}
				</div>
				{/* )} */}
			</div>
		</div>
	);
};

export default TimeEnrollLimitation;
