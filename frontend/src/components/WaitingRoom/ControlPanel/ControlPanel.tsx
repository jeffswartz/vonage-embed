import { Button, SxProps } from '@mui/material';
import React, { ReactElement } from 'react';
import MicNone from '@mui/icons-material/MicNone';
import VideoCall from '@mui/icons-material/VideoCall';
import Speaker from '@mui/icons-material/Speaker';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuDevicesWaitingRoom from '../MenuDevices';

import usePreviewPublisherContext from '../../../hooks/usePreviewPublisherContext';
import useDevices from '../../../hooks/useDevices';

type ControlPanelProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  openVideoInput: boolean;
  openAudioInput: boolean;
  openAudioOutput: boolean;
  anchorEl: HTMLElement | null;
};

/**
 * ControlPanel Component
 *
 * Displays dropdown menus to change the user's audio input, audio output, and video input devices.
 * @param {ControlPanelProps} props - The props for the component.
 * @param {Function} props.handleClick - Function to open the correct menu.
 * @param {() => void} props.handleClose - Function to close the menu.
 * @param {boolean} props.openVideoInput - Whether the video input menu is open.
 * @param {boolean} props.openAudioInput - Whether the audio input menu is open.
 * @param {boolean} props.openAudioOutput- Whether the audio output menu is open.
 * @param {HTMLElement | null} props.anchorEl - The reference element for the ControlPanel component.
 * @returns {ReactElement} - The ControlPanel component.
 */
const ControlPanel = ({
  handleClick,
  handleClose,
  openVideoInput,
  openAudioInput,
  openAudioOutput,
  anchorEl,
}: ControlPanelProps): ReactElement => {
  const { allMediaDevices } = useDevices();
  const {
    localAudioSource,
    localVideoSource,
    changeAudioSource,
    changeVideoSource,
    localAudioOutput,
    changeAudioOutput,
  } = usePreviewPublisherContext();

  const buttonSx: SxProps = {
    borderRadius: '10px',
    color: 'rgb(95, 99, 104)',
    textTransform: 'none', // ensures that the text is not upper case
    border: 'none',
    boxShadow: 'none',
    '&:hover': {
      border: 'none',
      boxShadow: 'none',
    },
  };

  return (
    <div className="m-auto my-4">
      <div className="flex flex-row justify-evenly min-[400px]:w-[400px]">
        <Button
          sx={buttonSx}
          endIcon={<KeyboardArrowDownIcon />}
          variant="outlined"
          startIcon={<MicNone />}
          aria-controls={openVideoInput ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={openVideoInput ? 'true' : undefined}
          onClick={handleClick}
        >
          Microphone
        </Button>
        <MenuDevicesWaitingRoom
          devices={allMediaDevices.audioInputDevices}
          open={openAudioInput}
          onClose={handleClose}
          anchorEl={anchorEl}
          localSource={localAudioSource}
          deviceChangeHandler={changeAudioSource}
          deviceType="audioInput"
        />
        <Button
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={buttonSx}
          variant="outlined"
          startIcon={<VideoCall />}
          aria-label="video"
        >
          Camera
        </Button>

        <MenuDevicesWaitingRoom
          devices={allMediaDevices.videoInputDevices}
          open={openVideoInput}
          onClose={handleClose}
          anchorEl={anchorEl}
          localSource={localVideoSource}
          deviceChangeHandler={changeVideoSource}
          deviceType="videoInput"
        />
        <Button
          onClick={handleClick}
          endIcon={<KeyboardArrowDownIcon />}
          sx={buttonSx}
          variant="outlined"
          startIcon={<Speaker />}
        >
          Speaker
        </Button>
        <MenuDevicesWaitingRoom
          devices={allMediaDevices.audioOutputDevices}
          open={openAudioOutput}
          onClose={handleClose}
          anchorEl={anchorEl}
          localSource={localAudioOutput}
          deviceChangeHandler={changeAudioOutput}
          deviceType="audioOutput"
        />
      </div>
    </div>
  );
};

export default ControlPanel;
