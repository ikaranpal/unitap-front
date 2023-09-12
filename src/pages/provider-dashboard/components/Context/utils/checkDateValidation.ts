const regexDateValidation = /^(?:0[1-9]|[12]\d|3[01])\/(?:0[1-9]|1[0-2])\/\d{4} - (?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

export const checkStartDate = (userDate: string) => {
	const today = new Date();
	const nextWeek = new Date(today);
	nextWeek.setDate(today.getDate() + 7);
	return convertStringToDate(userDate) > nextWeek;
};

export const checkEndDate = (end: string, start: string) => {
	return convertStringToDate(end) > convertStringToDate(start);
};

export const checkRegexDateValidation = (date: string) => {
	return regexDateValidation.test(date)
}

export const convertStringToDate = (userDate: string) => {
	// let [data, time] = userDate.split('-').map(x => x.trim());
	// let [y, m, d] = data.split('/')
	// let [h, min, s] = time.split(':');
	let dateParts = userDate.split('/');
	let timeParts = dateParts[2].split(' - ')[1].split(':');
	let dateObject = new Date(
		+dateParts[2].split(' - ')[0],
		+dateParts[1] - 1,
		+dateParts[0],
		+timeParts[0],
		+timeParts[1],
		+timeParts[2],
	);

	return dateObject;
};
