import { useCallback, useEffect, useState } from 'react';
import { getFormattedDate, getFormattedTime } from '../utils/dateTime';

/**
 * @typedef {object} UseDateTimeType
 * @property {string} date - The condensed date (e.g., "Wed, Jun 26")
 * @property {string} time - The (standard) time ("6:29 PM")
 */

/**
 * Hook for getting the date and time at the moment. The time is updated every second.
 * @returns {UseDateTimeType} the date and time
 */
const useDateTime = () => {
  const [date, setDate] = useState('Wed, Jun 26');
  const [time, setTime] = useState('5:01 PM');

  /**
   * Gets the current time and sets it in the format of "6:29 PM".
   */
  const updateTime = () => {
    const formattedTime = getFormattedTime();
    setTime(formattedTime);
  };

  /**
   * Gets the current date and sets it in the format of "Wed, Jun 26".
   */
  const updateDate = () => {
    const formattedDate = getFormattedDate();
    setDate(formattedDate);
  };

  /**
   * Re-sets the time every second.
   */
  const changeTime = useCallback(() => {
    const interval = setInterval(updateTime, 1_000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateTime();
    updateDate();
    changeTime();
  }, [changeTime]);

  return {
    date,
    time,
  };
};

export default useDateTime;
