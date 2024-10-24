import { useEffect, ReactElement } from 'react';
import usePublisherContext from '../../hooks/usePublisherContext';
import ConnectionAlert from '../../components/MeetingRoom/ConnectionAlert';
import Toolbar from '../../components/MeetingRoom/Toolbar';
import useSessionContext from '../../hooks/useSessionContext';
import useScreenShare from '../../hooks/useScreenShare';
import VideoTileCanvas from '../../components/MeetingRoom/VideoTileCanvas';
import EmojisOrigin from '../../components/MeetingRoom/EmojisOrigin';
import RightPanel from '../../components/MeetingRoom/RightPanel';
import useRoomName from '../../hooks/useRoomName';

/**
 * MeetingRoom Component
 *
 * This component renders the meeting room page of the application, including:
 * - All other users in the room (some may be hidden) and a screenshare (if applicable).
 * - A video preview of the user, and a preview of their screenshare if applicable.
 * - A toolbar to control user media, adjust room properties, and viewing options.
 * @returns {ReactElement} - The meeting room.
 */
const MeetingRoom = (): ReactElement => {
  const roomName = useRoomName();
  const { publisher, publish, quality } = usePublisherContext();
  const {
    joinRoom,
    subscriberWrappers,
    connected,
    disconnect,
    reconnecting,
    rightPanelActiveTab,
    toggleChat,
    toggleParticipantList,
    closeRightPanel,
  } = useSessionContext();
  const { isSharingScreen, screensharingPublisher, screenshareVideoElement, toggleShareScreen } =
    useScreenShare();

  useEffect(() => {
    if (joinRoom && roomName) {
      const sanitizedRoomName = encodeURIComponent(roomName);
      joinRoom(sanitizedRoomName);
    }
    return () => {
      // Ensure to disconnect session when unmounting meeting room in order
      disconnect?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomName]);

  useEffect(() => {
    if (connected && !publisher && publish) {
      publish();
    }
  }, [publisher, publish, connected]);

  return (
    <div data-testid="meetingRoom" className="meetingRoom w-screen">
      <VideoTileCanvas
        isSharingScreen={isSharingScreen}
        screensharingPublisher={screensharingPublisher}
        screenshareVideoElement={screenshareVideoElement}
        isRightPanelOpen={rightPanelActiveTab !== 'closed'}
        toggleParticipantList={toggleParticipantList}
      />
      <RightPanel activeTab={rightPanelActiveTab} handleClose={closeRightPanel} />
      <EmojisOrigin />
      <Toolbar
        isSharingScreen={isSharingScreen}
        toggleShareScreen={toggleShareScreen}
        rightPanelActiveTab={rightPanelActiveTab}
        toggleParticipantList={toggleParticipantList}
        toggleChat={toggleChat}
        participantCount={
          subscriberWrappers.filter(({ isScreenshare }) => !isScreenshare).length + 1
        }
      />
      {reconnecting && (
        <ConnectionAlert
          title="Lost connection"
          message="Please verify your network connection"
          severity="error"
        />
      )}
      {!reconnecting && quality !== 'good' && (
        <ConnectionAlert
          closable
          title="Video quality problem"
          message="Please check your connectivity. Your video may be disabled to improve the user experience"
          severity="warning"
        />
      )}
    </div>
  );
};

export default MeetingRoom;
