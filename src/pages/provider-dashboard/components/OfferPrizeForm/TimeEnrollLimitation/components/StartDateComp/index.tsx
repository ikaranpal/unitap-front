import usePrizeOfferFormContext from 'hooks/usePrizeOfferFormContext';
import { ErrorProps } from 'types';
import DatePicker from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import 'react-multi-date-picker/styles/backgrounds/bg-dark.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Input = styled.input``;

interface StartDateCompProp {
	showErrors: ErrorProps | null;
}

const StartDateComp = ({ showErrors }: StartDateCompProp) => {
	const { data, handleSetDate } = usePrizeOfferFormContext();
	const sevenDaysLater: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const [startDate, setStartDate] = useState<any>();

	useEffect(() => {
		if (startDate?.unix) {
			handleSetDate(startDate.unix, 'startTime');
		}
	}, [startDate]);

	useEffect(() => {
		if (data.startTimeStamp) {
			setStartDate(data.startTimeStamp * 1000);
		}
	}, []);

	const handleChange = () => {};

	return (
		<div className="relative w-full">
			<div className="flex text-[12px] bg-gray40 border border-gray50 rounded-[12px] h-[44px] items-center w-full max-w-[452px] overflow-hidden">
				<p className="text-gray100 text-[12px] w-full max-w-[148px] bg-gray30 h-full flex items-center justify-center">
					Start Date & Time
				</p>
				<DatePicker
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
					format="DD/MM/YYYY - HH:mm:ss"
					inputClass="custom-input"
					plugins={[<TimePicker position="bottom" />]}
					render={
						<Input className="date-picker-input" onChange={handleChange} readOnly placeholder="DD/MM/YYYY - HH:MM:SS" />
					}
					onChange={setStartDate}
					value={startDate}
					minDate={Date.now()}
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
