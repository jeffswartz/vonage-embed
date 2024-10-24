import { Box, MenuItem, MenuList, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { Device } from '@opentok/client';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { useState, useEffect, MouseEvent as ReactMouseEvent, ReactElement } from 'react';
import useDevices from '../../../../hooks/useDevices';
import usePublisherContext from '../../../../hooks/usePublisherContext';

type InputDevicesProps = {
  handleToggle: () => void;
  customLightBlueColor: string;
};

/**
 * InputDevices Component
 *
 * Displays the audio input devices for a user. Handles switching audio input devices.
 * @param {InputDevicesProps} props - The props for the component.
 * @param {Function} props.handleToggle - The click handler to handle closing the menu.
 * @param {string} props.customLightBlueColor - The custom color used for the toggled icon.
 * @returns {ReactElement} - The InputDevices component.
 */
const InputDevices = ({ handleToggle, customLightBlueColor }: InputDevicesProps): ReactElement => {
  const { publisher, isPublishing } = usePublisherContext();
  const [devicesAvailable, setDevicesAvailable] = useState<Device[] | null>(null);
  const { allMediaDevices } = useDevices();
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setDevicesAvailable(allMediaDevices.audioInputDevices);
  }, [publisher, allMediaDevices, devicesAvailable, isPublishing]);
  const changeAudioSource = (deviceId: string) => {
    publisher?.setAudioSource(deviceId);
  };

  useEffect(() => {
    if (devicesAvailable) {
      const audioDevicesAvailable: string[] = devicesAvailable.map((availableDevice: Device) => {
        return availableDevice.label;
      });
      setOptions(audioDevicesAvailable);
    }
  }, [devicesAvailable]);

  const handleChangeAudioSource = (event: ReactMouseEvent<HTMLLIElement>) => {
    const menuItem = event.target as HTMLLIElement;
    handleToggle();
    const audioDeviceId = devicesAvailable?.find((device: Device) => {
      return device.label === menuItem.textContent;
    })?.deviceId;
    if (audioDeviceId) {
      changeAudioSource(audioDeviceId);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          ml: 2,
          mt: 1,
          mb: 0.5,
        }}
      >
        <MicNoneIcon sx={{ fontSize: 24, mr: 2 }} />
        <Typography>Microphone</Typography>
      </Box>
      <MenuList>
        {options.map((option: string) => {
          const isSelected = option === publisher?.getAudioSource().label;
          return (
            <MenuItem
              key={option}
              selected={isSelected}
              onClick={(event) => handleChangeAudioSource(event)}
              sx={{
                backgroundColor: 'transparent',
                '&.Mui-selected': {
                  backgroundColor: 'transparent',
                  color: customLightBlueColor,
                },
                '&:hover': {
                  backgroundColor: 'rgba(25, 118, 210, 0.12)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  mb: 0.5,
                  overflow: 'hidden',
                }}
              >
                {isSelected ? (
                  <CheckIcon sx={{ color: customLightBlueColor, fontSize: 24, mr: 2 }} />
                ) : (
                  <Box sx={{ width: 40 }} /> // Placeholder when CheckIcon is not displayed
                )}
                <Typography noWrap>{option}</Typography>
              </Box>
            </MenuItem>
          );
        })}
      </MenuList>
    </>
  );
};

export default InputDevices;
