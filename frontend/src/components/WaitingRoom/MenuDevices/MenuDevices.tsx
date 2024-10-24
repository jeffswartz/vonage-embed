import { Menu, MenuItem, Typography } from '@mui/material';
import { Speaker } from '@mui/icons-material';
import { AudioOutputDevice, Device } from '@opentok/client';
import { ReactElement } from 'react';
import useSound from '../../../hooks/useSound';

type MenuDevicesWaitingRoomProps = {
  onClose: () => void;
  open: boolean;
  devices: (Device | AudioOutputDevice)[];
  anchorEl: HTMLElement | null;
  localSource: string | undefined;
  deviceChangeHandler: (deviceId: string) => void;
  deviceType: string;
};

/**
 * MenuDevices Component
 *
 * Displays a list of audio input, audio output, or video input devices to select which devices should be used.
 * If the list is of audio output devices, also displays an audio test button.
 * @param {MenuDevicesWaitingRoomProps} props - The props for the component.
 * @param {Function} props.onClose - Menu close handler.
 * @param {boolean} props.open - Whether the menu is open or not.
 * @param {Device[] | AudioOutputDevice[]} props.devices - The list of devices for the menu.
 * @param {HTMLElement | null} props.anchorEl - The anchor element.
 * @param {string | undefined} props.localSource - The deviceId for the user's currently used device.
 * @param {Function} props.deviceChangeHandler - Handles changing the device.
 * @param {string} props.deviceType - The device type for the menu, either `audioInput`, `audioOutput`, or `videoInput`.
 * @returns {ReactElement} - The MenuDevices component
 */
const MenuDevices = ({
  devices,
  onClose,
  open,
  anchorEl,
  localSource,
  deviceChangeHandler,
  deviceType,
}: MenuDevicesWaitingRoomProps): ReactElement => {
  const { togglePlay, playing } = useSound();

  const handleClick = (deviceId: string) => {
    deviceChangeHandler(deviceId);
    onClose();
  };

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{ 'aria-labelledby': 'basic-button' }}
    >
      {devices.map((device) => (
        <MenuItem
          onClick={() => {
            if (!device.deviceId) {
              return;
            }
            handleClick(device.deviceId);
          }}
          key={device.deviceId}
          selected={device.deviceId === localSource}
          sx={{
            pl: 4,
            backgroundColor: device.deviceId === localSource ? 'rgba(26,115,232,.9)' : '',
          }}
        >
          {device.label}
        </MenuItem>
      ))}
      {deviceType === 'audioOutput' && (
        <MenuItem onClick={togglePlay}>
          <Speaker
            sx={{
              fontSize: 24,
              mr: 1,
              ml: 1.5,
              color: 'rgb(95, 99, 104)',
            }}
          />
          <Typography noWrap>{!playing ? 'Test speakers' : 'Stop testing'}</Typography>
        </MenuItem>
      )}
    </Menu>
  );
};

export default MenuDevices;
