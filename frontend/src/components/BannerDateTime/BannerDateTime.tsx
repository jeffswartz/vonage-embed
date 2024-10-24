import { ReactElement } from 'react';
import useDateTime from '../../hooks/useDateTime';

/**
 * BannerDateTime Component
 *
 * This component returns a UI that includes current time and date.
 * @returns {ReactElement} - the banner with a date and time component
 */
const BannerDateTime = (): ReactElement => {
  const { date, time } = useDateTime();

  return (
    <div
      className="text-slate-500 text-lg font-normal items-center hidden md:flex"
      data-testid="dateAndTime"
    >
      <span className="mr-1">{time}</span>
      <span className="mr-1"> • </span>
      <span className="mr-1">{date}</span>
    </div>
  );
};

export default BannerDateTime;
