import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ErrorProps } from 'types';

interface StartDateCompProp {
	showErrors: ErrorProps | null;
}

const StartDateComp = ({ showErrors }: StartDateCompProp) => {
	const { data, handleChange } = usePrizeOfferFormContext();
	return (
		<div className="relative w-full">
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
			{showErrors && showErrors.startDateStatus == false && (
				<p className="text-error text-[10px] m-0 p-0 absolute left-1">
					{showErrors && showErrors.statDateStatusMessage}
				</p>
			)}
		</div>
	);
};

export default StartDateComp;
