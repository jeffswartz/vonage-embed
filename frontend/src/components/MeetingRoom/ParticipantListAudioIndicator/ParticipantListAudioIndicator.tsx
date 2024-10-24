import Mic from '@mui/icons-material/Mic';
import MicOff from '@mui/icons-material/MicOff';
import { ReactElement } from 'react';
import VoiceIndicatorIcon from '../VoiceIndicator/VoiceIndicator';

type ParticipantAudioIndicatorProps = {
  hasAudio?: boolean;
  audioLevel?: number;
};

/**
 * ParticipantListAudioIndicator Component
 *
 * This component displays an audio indicator based on the participant's audio level or status.
 * @param {ParticipantAudioIndicatorProps} props - the props for the component.
 * @param {boolean} props.hasAudio - (optional) indicates whether the user has audio enabled.
 * @param {number} props.audioLevel - (optional) indicates the current audio level of a user.
 * @returns {ReactElement} The ParticipantListAudioIndicator component.
 */
const ParticipantAudioIndicator = ({
  audioLevel,
  hasAudio,
}: ParticipantAudioIndicatorProps): ReactElement => {
  if (audioLevel !== undefined) {
    return <VoiceIndicatorIcon publisherAudioLevel={audioLevel} size={20} />;
  }
  return hasAudio ? <Mic sx={{ fontSize: '18px' }} /> : <MicOff sx={{ fontSize: '18px' }} />;
};

export default ParticipantAudioIndicator;
