import { SetStateAction, Dispatch, ReactElement } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import { Keyboard } from '@mui/icons-material';

type RoomNameInputProps = {
  setRoomName: Dispatch<SetStateAction<string>>;
  roomName: string;
};

/**
 * RoomNameInput Component
 *
 * Input box to handle setting a custom room name.
 * @param {RoomNameInputProps} props - The props for the component.
 * @param {Dispatch<SetStateAction<string>>} props.setRoomName - Function to update the room name.
 * @param {string} props.roomName - The room name set by the user.
 * @returns {ReactElement} - The RoomNameInput component.
 */
const RoomNameInput = ({ setRoomName, roomName }: RoomNameInputProps): ReactElement => {
  return (
    <TextField
      id="room-name"
      className="w-52 h-12 pr-2"
      placeholder="Enter room name"
      value={roomName}
      onChange={(textChangeEvent) => setRoomName(textChangeEvent.target.value.toLowerCase())}
      InputProps={{
        inputProps: { maxLength: 60 },
        startAdornment: (
          <InputAdornment position="start">
            <Keyboard />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default RoomNameInput;
