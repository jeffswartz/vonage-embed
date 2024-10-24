import { IconButton, List } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { ReactElement } from 'react';
import useSessionContext from '../../../hooks/useSessionContext';
import useUserContext from '../../../hooks/useUserContext';
import useAudioLevels from '../../../hooks/useAudioLevels';
import ParticipantListItem from '../ParticipantListItem';
import getInitials from '../../../utils/getInitials';
import { SubscriberWrapper } from '../../../types/session';
import getParticipantColor from '../../../utils/getParticipantColor';
import useRoomShareUrl from '../../../hooks/useRoomShareUrl';
import RightPanelTitle from '../RightPanel/RightPanelTitle';

const compareNameAlphabetically = (a: SubscriberWrapper, b: SubscriberWrapper) => {
  const nameA = a.subscriber?.stream?.name;
  const nameB = b.subscriber?.stream?.name;
  if (!nameA) {
    return 1;
  }
  if (!nameB) {
    return -1;
  }
  return nameA.localeCompare(nameB);
};

type ParticipantListProps = {
  handleClose: () => void;
  isOpen: boolean;
};

/**
 * ParticipantList Component
 *
 * This component shows a list of the participants that are currently in the meeting room.
 * It also has a meeting URL link that can be copied to the clipboard.
 * @param {ParticipantListProps} props - the props for the component.
 * @param {Function} props.handleClose - a function that handles closing of the participant list.
 * @param {boolean} props.isOpen - a variable that shows whether the participant list should be displayed.
 * @returns {ReactElement} The participant list component.
 */
const ParticipantList = ({ handleClose, isOpen }: ParticipantListProps): ReactElement | false => {
  const { subscriberWrappers } = useSessionContext();
  const publisherAudio = useAudioLevels();
  const {
    user: {
      defaultSettings: { name },
    },
  } = useUserContext();
  const roomShareUrl = useRoomShareUrl();
  const copyUrl = () => {
    navigator.clipboard.writeText(roomShareUrl);
  };
  return (
    isOpen && (
      <>
        <RightPanelTitle title="Participants" handleClose={handleClose} />
        <div className="h-[64px] flex flex-row items-center justify-between pl-6">
          <div className="text-left">
            <span className="font-bold text-sm text-darkGray tracking-normal font-bold">
              Meeting URL:
            </span>{' '}
            <br />
            <span className="block max-w-64	font-normal text-sm text-darkGray tracking-normal truncate">
              {window.location.href}
            </span>
          </div>
          <IconButton size="large" sx={{ color: 'rgb(95, 99, 104)' }} onClick={copyUrl}>
            <ContentCopy />
          </IconButton>
        </div>
        <List sx={{ overflowX: 'auto', height: 'calc(100vh - 240px)' }}>
          <ParticipantListItem
            key="you"
            dataTestId="participant-list-item-you"
            audioLevel={publisherAudio}
            name={`${name} (You)`}
            initials={getInitials(name)}
            avatarColor={getParticipantColor(name)}
          />
          {subscriberWrappers
            .filter(({ isScreenshare }) => !isScreenshare)
            .sort(compareNameAlphabetically)
            .map(({ id, subscriber }) => {
              const hasAudio = !!subscriber.stream?.hasAudio;
              const participantName = subscriber?.stream?.name ?? '';
              return (
                <ParticipantListItem
                  key={id}
                  dataTestId={`participant-list-item-${id}`}
                  hasAudio={hasAudio}
                  name={participantName}
                  initials={getInitials(participantName)}
                  avatarColor={getParticipantColor(participantName)}
                />
              );
            })}
        </List>
      </>
    )
  );
};

export default ParticipantList;
