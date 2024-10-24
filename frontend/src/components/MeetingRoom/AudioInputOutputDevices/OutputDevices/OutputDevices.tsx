import { Box, MenuItem, MenuList, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import OT, { AudioOutputDevice } from '@opentok/client';
import { useState, useEffect, MouseEvent, ReactElement } from 'react';
import useDevices from '../../../../hooks/useDevices';
import usePublisherContext from '../../../../hooks/usePublisherContext';
import DropdownSeparator from '../../DropdownSeparator';

type OutputDevicesProps = {
  handleToggle: () => void;
  customLightBlueColor: string;
};

/**
 * OutputDevices Component
 *
 * Displays and switches audio output devices.
 * @param {OutputDevicesProps} props - The props for the component.
 * @param {() => void} props.handleToggle - Function to close the menu.
 * @param {string} props.customLightBlueColor - The custom color used for the selected device.
 * @returns {ReactElement} - The OutputDevices component.
 */
const OutputDevices = ({
  handleToggle,
  customLightBlueColor,
}: OutputDevicesProps): ReactElement => {
  const { publisher, isPublishing } = usePublisherContext();
  const [devicesAvailable, setDevicesAvailable] = useState<AudioOutputDevice[] | null>(null);
  const { allMediaDevices } = useDevices();
  const [selectedActiveAudioOutput, setSelectedAudioOutput] = useState<AudioOutputDevice | null>(
    null
  );

  useEffect(() => {
    setDevicesAvailable(allMediaDevices.audioOutputDevices);
  }, [publisher, allMediaDevices, isPublishing]);

  const changeAudioOutput = async (deviceId: string) => {
    await OT.setAudioOutputDevice(deviceId);
    const updatedDevice = devicesAvailable?.find((device) => device.deviceId === deviceId) || null;
    setSelectedAudioOutput(updatedDevice);
  };

  useEffect(() => {
    const getActiveAudioOutputDeviceLabel = async () => {
      const activeOutputDevice = await OT.getActiveAudioOutputDevice();
      setSelectedAudioOutput(activeOutputDevice);
    };
    getActiveAudioOutputDeviceLabel();
  }, []);

  const handleChangeAudioOutput = (event: MouseEvent<HTMLLIElement>) => {
    const menuItem = event.target as HTMLLIElement;
    handleToggle();

    const selectedDevice = devicesAvailable?.find((device: AudioOutputDevice) => {
      return device.label === menuItem.textContent;
    });

    if (selectedDevice?.deviceId) {
      changeAudioOutput(selectedDevice.deviceId);
    }
  };

  return (
    <>
      <DropdownSeparator />
      <Box
        sx={{
          display: 'flex',
          ml: 2,
          mt: 2,
          mb: 0.5,
        }}
      >
        <VolumeUpIcon sx={{ fontSize: 24, mr: 2 }} />
        <Typography>Speakers</Typography>
      </Box>
      <MenuList>
        {devicesAvailable?.map((device: AudioOutputDevice) => {
          const isSelected = device.deviceId === selectedActiveAudioOutput?.deviceId;
          return (
            <MenuItem
              key={device.deviceId}
              selected={isSelected}
              onClick={handleChangeAudioOutput}
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
                  <CheckIcon sx={{ color: 'rgb(138, 180, 248)', fontSize: 24, mr: 2 }} />
                ) : (
                  <Box sx={{ width: 40 }} /> // Placeholder when CheckIcon is not displayed
                )}
                <Typography noWrap>{device.label}</Typography>
              </Box>
            </MenuItem>
          );
        })}
      </MenuList>
    </>
  );
};

export default OutputDevices;
