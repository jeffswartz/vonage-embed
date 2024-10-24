import { MicOff, Mic } from '@mui/icons-material';
import { ReactElement } from 'react';

type AudioIndicatorProps = {
  hasAudio: boolean | undefined;
};

/**
 * AudioIndicator Component
 *
 * This component displays an icon based on the audio status.
 * @param {AudioIndicatorProps} hasAudio - Indicates whether the user has audio enabled.
 * @returns {ReactElement} The audio indicator component.
 */
const AudioIndicator = ({ hasAudio }: AudioIndicatorProps): ReactElement => {
  return (
    <div
      data-testid="audio-indicator"
      className="rounded-xl absolute top-3 right-3 bg-darkGray-55 h-6 w-6 items-center justify-center flex m-auto"
    >
      {hasAudio ? (
        <Mic sx={{ color: 'white', fontSize: '18px' }} />
      ) : (
        <MicOff data-testid="MicOffIndicator" sx={{ color: 'white', fontSize: '18px' }} />
      )}
    </div>
  );
};

export default AudioIndicator;
