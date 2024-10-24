import { Typography, MenuItem, IconButton, MenuList } from '@mui/material';
import { useState, useEffect, ReactElement } from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Grow from '@mui/material/Grow';
import { hasMediaProcessorSupport } from '@opentok/client';
import HeadsetIcon from '@mui/icons-material/Headset';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import usePublisherContext from '../../../../hooks/usePublisherContext';
import useSound from '../../../../hooks/useSound';
import DropdownSeparator from '../../DropdownSeparator';

type ReduceNoiseTestSpeakersProps = {
  customLightBlueColor: string;
};

/**
 * ReduceNoiseTestSpeakers Component
 *
 * This component displays an option to enable advanced noise suppression
 * as well as to test the speakers.
 * @param {ReduceNoiseTestSpeakersProps} props - the props for the component.
 * @param {string} props.customLightBlueColor - the custom color used for the toggled icon.
 * @returns {ReactElement | false} Returns either false if Media Processor is not supported or ReduceNoiseTestSpeakers component.
 */
const ReduceNoiseTestSpeakers = ({
  customLightBlueColor,
}: ReduceNoiseTestSpeakersProps): ReactElement | false => {
  const { publisher } = usePublisherContext();
  const [isToggled, setIsToggled] = useState(false);
  const { togglePlay, playing } = useSound();

  const handleToggle = async () => {
    const newState = !isToggled;
    setIsToggled(newState);
    window.localStorage.setItem('noiseSuppression', JSON.stringify(newState));
    if (newState) {
      await publisher?.applyAudioFilter({ type: 'advancedNoiseSuppression' });
    } else {
      await publisher?.clearAudioFilter();
    }
  };

  useEffect(() => {
    const audioFilter = publisher?.getAudioFilter();
    setIsToggled(audioFilter !== null);
  }, [publisher]);

  return (
    <>
      <DropdownSeparator />
      <MenuList
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mt: 1,
        }}
      >
        {hasMediaProcessorSupport() && (
          <MenuItem
            onClick={handleToggle}
            sx={{
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.12)',
              },
            }}
          >
            <HeadsetIcon sx={{ fontSize: 24, mr: 2 }} />
            <Typography noWrap sx={{ mr: 2 }}>
              Reduce background noise
            </Typography>
            <IconButton disableRipple>
              <Grow in={!isToggled} timeout={300}>
                <ToggleOffIcon fontSize="large" sx={{ position: 'absolute', color: 'white' }} />
              </Grow>
              <Grow in={isToggled} timeout={300}>
                <ToggleOnIcon
                  fontSize="large"
                  sx={{ position: 'absolute', color: customLightBlueColor }}
                />
              </Grow>
            </IconButton>
          </MenuItem>
        )}
        <MenuItem
          onClick={togglePlay}
          sx={{
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.12)',
            },
          }}
        >
          <VolumeUpIcon sx={{ fontSize: 24, mr: 2 }} />
          <Typography noWrap>{!playing ? 'Test speakers' : 'Stop testing'}</Typography>
        </MenuItem>
      </MenuList>
    </>
  );
};

export default ReduceNoiseTestSpeakers;
