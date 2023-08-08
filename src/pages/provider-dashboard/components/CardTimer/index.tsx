import { useEffect, useMemo, useState } from 'react';

type CardTimerProps = {
	startTime: string;
	FinishTime: string;
};

const CardTimer = ({ startTime, FinishTime }: CardTimerProps) => {
	const [now, setNow] = useState(new Date());
	const [days, setDays] = useState('00');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');

	let startTimeDate = useMemo(() => new Date(startTime), [startTime]);
	let FinishTimeDate = useMemo(() => new Date(FinishTime), [FinishTime]);

	let deadline = useMemo(
		() => (startTimeDate.getTime() > now.getTime() ? startTimeDate : FinishTimeDate),
		[startTimeDate, FinishTimeDate, now],
	);

	useEffect(() => {
		// calculate time difference between now and deadline
		const diff = deadline.getTime() - now.getTime();
		// time calculations for days, hours, minutes and seconds
		const days = Math.floor(diff / (1000 * 60 * 60 * 24));
		const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
		const seconds = Math.floor((diff % (1000 * 60)) / 1000);
		// set the state with the time difference
		setSeconds(seconds < 10 ? `0${seconds}` : seconds.toString());
		setMinutes(minutes < 10 ? `0${minutes}` : minutes.toString());
		setHours(hours < 10 ? `0${hours}` : hours.toString());
		setDays(days < 10 ? `0${days}` : days.toString());
	}, [now, deadline]);

	useEffect(() => {
		const interval = setInterval(() => setNow(new Date()), 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<div className="prize-card__timer flex bg-gray50 items-center justify-between rounded-xl gap-2 px-3 py-2 h-[48px]">
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-gray100 font-semibold">{days}</p>
				<p className="prize-card__timer-item-label text-gray90">d</p>
			</div>
			<p className="text-sm text-gray100">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-gray100 font-semibold">{hours}</p>
				<p className="prize-card__timer-item-label text-gray90">h</p>
			</div>
			<p className="text-sm text-gray100">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-gray100 font-semibold">{minutes}</p>
				<p className="prize-card__timer-item-label text-gray90">m</p>
			</div>
			<p className="text-sm text-gray100">:</p>
			<div className="prize-card__timer-item flex flex-col justify-between items-center text-[10px]">
				<p className="prize-card__timer-item-value text-gray100 font-semibold">{seconds}</p>
				<p className="prize-card__timer-item-label text-gray90">s</p>
			</div>
		</div>
	);
};

export default CardTimer;
