import { Button } from '@mui/material';
import { MouseEvent, ReactElement, TouchEvent } from 'react';

type ReenterRoomButtonProps = {
  handleReenter: (event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => void;
  roomName: string;
};

/**
 * ReenterRoomButton Component
 *
 * This component returns a button that takes a user back to the meeting.
 * @param {ReenterRoomButtonProps} props - the props for this component.
 * @param {Function} props.handleReenter - the function that handles the action of reentering.
 * @param {string} props.roomName - the name of the room to rejoin.
 * @returns {ReactElement} - the reenter room button or an empty string if the room does not exist.
 */
const ReenterRoomButton = ({
  handleReenter,
  roomName,
}: ReenterRoomButtonProps): ReactElement | string => {
  return (
    roomName && (
      <Button
        variant="outlined"
        className="h-12"
        sx={{
          textTransform: 'none',
          fontSize: '1rem',
          marginRight: '8px',
          marginBottom: '16px',
        }}
        onClick={handleReenter}
      >
        Reenter
      </Button>
    )
  );
};

export default ReenterRoomButton;
