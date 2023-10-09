import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { useEffect, useState } from 'react';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import styled from 'styled-components';
import { ErrorProps } from 'types';
const Input = styled.input``;
interface EndDateCompProp {
	showErrors: ErrorProps | null;
}

const EndDateComp = ({ showErrors }: EndDateCompProp) => {
	const { data, handleSetDate, setDuration } = usePrizeOfferFormContext();

	const [endDate, setEndDate] = useState<any>();

	useEffect(() => {
		if (data.endTimeStamp && !setDuration) {
			setEndDate(data.endTimeStamp * 1000);
		}
	}, []);

	useEffect(() => {
		if (endDate?.unix) {
			handleSetDate(Math.round(new Date(endDate.unix * 1000).setSeconds(0) / 1000), 'endTime');
		}
	}, [endDate]);

	const handleChange = () => {};
	return (
		<div className="relative w-full">
			<div className="flex gap-2 text-gray80 text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center justify-between w-full max-w-[452px] overflow-hidden">
				<p className="text-gray100 text-[12px] w-full max-w-[148px] bg-gray30 h-full flex items-center justify-center">
					End Date & Time
				</p>
				<DatePicker
					disabled={!data.startTimeStamp}
					style={{
						border: 'none',
						width: '100%',
						background: 'none',
						color: '#b5b5c6',
						display: 'flex',
					}}
					containerStyle={{
						width: '100%',
					}}
					name="startTime"
					format="DD/MM/YYYY - hh:mm A"
					inputClass="custom-input"
					plugins={[<TimePicker position="bottom" hideSeconds />]}
					render={
						<Input className="date-picker-input" onChange={handleChange} readOnly placeholder="DD/MM/YYYY - HH:MM" />
					}
					onChange={setEndDate}
					value={endDate}
					minDate={Date.now()}
					className="rmdp-mobile"
				/>
			</div>
			{showErrors && showErrors.endDateStatus == false && (
				<p className="text-error text-[10px] m-0 p-0 absolute left-1">
					{showErrors && showErrors.endDateStatusMessage}
				</p>
			)}
		</div>
	);
};

export default EndDateComp;
