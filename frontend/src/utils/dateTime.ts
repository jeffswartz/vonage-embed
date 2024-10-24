/**
 * Gets the current time and sets it in the format of "6:29 PM".
 * @param {number} [timestamp]  - optional timestamp, if omitted uses current system time
 * @returns {string} formatted time
 */
export const getFormattedTime = (timestamp?: number) => {
  const dateTime = timestamp ? new Date(timestamp) : new Date();

  let hours = dateTime.getHours();
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12; // Converts from 24h format to 12h
  hours = hours || 12; // If midnight, it's really 12 not 0

  let minutes: number | string = dateTime.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${amOrPm}`;
};

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthsOfYear = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Gets the current date and sets it in the format of "Wed, Jun 26".
 * @param {number} timestamp - optional timestamp. If omitted used current system time
 * @returns {number} formatted date
 */
export const getFormattedDate = (timestamp?: number) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  const dayOfWeek = daysOfWeek[date.getDay()];
  const monthOfYear = monthsOfYear[date.getMonth()];
  const dayOfMonth = date.getDate();
  return `${dayOfWeek}, ${monthOfYear} ${dayOfMonth}`;
};
