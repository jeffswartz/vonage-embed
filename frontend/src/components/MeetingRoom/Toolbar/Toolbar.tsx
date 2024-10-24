import { ReactElement, useCallback } from 'react';
import AudioControlButton from '../AudioControlButton';
import VideoControlButton from '../VideoControlButton';
import ScreenSharingButton from '../../ScreenSharingButton';
import TimeRoomNameMeetingRoom from '../TimeRoomName';
import ExitButton from '../ExitButton';
import useSessionContext from '../../../hooks/useSessionContext';
import LayoutToggleButton from '../LayoutToggleButton';
import ParticipantListToggleButton from '../ParticipantListToggleButton';
import ArchivingToggleButton from '../ArchivingToggleButton';
import EmojiGrid from '../EmojiGrid';
import ChatToggleButton from '../ChatToggleButton';
import { RightPanelActiveTab } from '../../../hooks/useRightPanel';

type ToolbarProps = {
  toggleShareScreen: () => void;
  isSharingScreen: boolean;
  rightPanelActiveTab: RightPanelActiveTab;
  toggleParticipantList: () => void;
  toggleChat: () => void;
  participantCount: number;
};

/**
 * Toolbar Component
 *
 * This component returns the UI for the toolbar that is displayed on the bottom of the meeting room.
 * It displays the following items:
 * - Current time and meeting room name
 * - Microphone state with the ability to toggle it on/off as well as open a dropdown with some audio settings
 * - Video state with the ability to toggle it on/off as well as open a dropdown with some video settings
 * - Screensharing button
 * - Button to toggle current layout (grid or active speaker)
 * - Button to express yourself (emojis)
 * - Button to open a pop up to start meeting recording (archiving)
 * - Button to exit a meeting (redirects to the goodbye page)
 * @param {ToolbarProps} props - the props for the component
 * @param {() => void} props.toggleScreenShare - the prop to toggle the screen share on and off
 * @param {boolean} props.isSharingScreen - the prop to check if the user is currently sharing a screen
 * @param {boolean} props.isParticipantListOpen - the prop to check if the participant list is open
 * @param {() => void} props.openParticipantList - the prop to open the participant list
 * @param {number} props.participantCount - the prop that holds the current number of participants
 * @returns {ReactElement} - the toolbar component
 */
const Toolbar = ({
  isSharingScreen,
  toggleShareScreen,
  rightPanelActiveTab,
  toggleParticipantList,
  toggleChat,
  participantCount,
}: ToolbarProps): ReactElement => {
  const { disconnect, unreadCount } = useSessionContext();
  const handleLeave = useCallback(() => {
    if (!disconnect) {
      return;
    }
    disconnect();
  }, [disconnect]);

  return (
    <div className="flex flex-col md:flex-row items-center absolute h-[80px] w-full bottom-0 left-0 bg-darkGray-100 md:justify-between p-4">
      <div className="flex flex-1 overflow-hidden justify-start pr-2">
        <TimeRoomNameMeetingRoom />
      </div>
      <div className="flex flex-1 justify-center">
        <AudioControlButton />
        <VideoControlButton />
        <ScreenSharingButton
          toggleShareScreen={toggleShareScreen}
          isSharingScreen={isSharingScreen}
        />
        <LayoutToggleButton />
        <EmojiGrid />
        <ArchivingToggleButton />
        <ExitButton handleLeave={handleLeave} />
      </div>

      <div className="hidden md:flex flex-1 justify-end">
        <ParticipantListToggleButton
          isOpen={rightPanelActiveTab === 'participant-list'}
          handleClick={toggleParticipantList}
          participantCount={participantCount}
        />
        <ChatToggleButton
          isOpen={rightPanelActiveTab === 'chat'}
          handleClick={toggleChat}
          unreadCount={unreadCount}
        />
      </div>
    </div>
  );
};

export default Toolbar;
