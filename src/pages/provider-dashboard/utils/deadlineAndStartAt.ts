export const deadline = (endTimeStamp: number) =>
new Date(endTimeStamp * 1000).getFullYear() +
'-' +
(Number(new Date(endTimeStamp * 1000).getMonth()) + 1) +
'-' +
new Date(endTimeStamp * 1000).getDate() +
' ' +
new Date(endTimeStamp * 1000).getHours() +
':' +
new Date(endTimeStamp * 1000).getMinutes();


export const startAt = (startTimeStamp: number) =>
new Date(startTimeStamp * 1000).getFullYear() +
'-' +
(Number(new Date(startTimeStamp * 1000).getMonth()) + 1) +
'-' +
new Date(startTimeStamp * 1000).getDate() +
' ' +
new Date(startTimeStamp * 1000).getHours() +
':' +
new Date(startTimeStamp * 1000).getMinutes();