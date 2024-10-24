import { Button } from '@mui/material';
import { VideoCall } from '@mui/icons-material';
import { ReactElement } from 'react';

type NewRoomButtonProps = {
  handleNewRoom: () => void;
};

/**
 * NewRoomButton Component
 *
 * This component renders a button to create a new room.
 * @param {NewRoomButtonProps} props - the props for the component.
 * @param {() => void} props.handleNewRoom - method that handles the action when user click the 'create room' button.
 * @returns {ReactElement} The new room button component.
 */
const NewRoomButton = ({ handleNewRoom }: NewRoomButtonProps): ReactElement => {
  return (
    <Button
      variant="contained"
      className="h-14 mt-2"
      startIcon={<VideoCall />}
      onClick={handleNewRoom}
      fullWidth
      sx={{
        textTransform: 'none',
        marginBottom: '35px',
        fontSize: '1rem',
        justifyContent: 'space-between',
        width: '18rem',
      }}
    >
      <div className="text-center w-full flex justify-center items-center">Create embed</div>
    </Button>
  );
};

export default NewRoomButton;
