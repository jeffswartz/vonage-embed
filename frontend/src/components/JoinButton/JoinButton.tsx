import { Button } from '@mui/material';
import { MouseEvent, ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

type JoinButtonProps = {
  roomName: string;
};

/**
 * JoinButton Component
 *
 * This component returns a button that takes a user to the meeting.
 * @param {JoinButtonProps} props - the props for this component.
 * @param {string} props.roomName - the name of the room to join.
 * @returns {ReactElement} - the join room button.
 */
const JoinButton = ({ roomName }: JoinButtonProps): ReactElement => {
  const navigate = useNavigate();

  const handleJoin = (event: MouseEvent) => {
    event.preventDefault();
    const sanitizedRoomName = encodeURIComponent(roomName);
    navigate(`/waiting-room/${sanitizedRoomName}`);
  };

  return (
    <Button
      disabled={roomName === ''}
      className="h-14"
      sx={{ textTransform: 'none', marginLeft: '8px' }}
      onClick={handleJoin}
      type="submit"
    >
      Join
    </Button>
  );
};

export default JoinButton;
