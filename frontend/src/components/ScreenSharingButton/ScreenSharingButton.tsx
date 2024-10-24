import ScreenOff from '@mui/icons-material/StopScreenShare';
import ScreenShare from '@mui/icons-material/ScreenShare';
import Tooltip from '@mui/material/Tooltip';
import { ReactElement } from 'react';
import displayOnDesktop from '../../utils/displayOnDesktop/displayOnDesktop';
import ToolbarButton from '../MeetingRoom/ToolbarButton';

type ScreenShareButtonProps = {
  toggleShareScreen: () => void;
  isSharingScreen: boolean;
};

/**
 * ScreenSharingButton Component
 *
 * Button to toggle on a user's screenshare and to display whether a user is sharing their screen.
 * @param {ScreenShareButtonProps} props - The props for the component.
 * @param {Function} props.toggleShareScreen - Function to toggle screenshare.
 * @param {boolean} props.isSharingScreen - Whether the user is sharing their screen or not.
 * @returns {ReactElement} - The ScreenSharingButton component
 */
const ScreenSharingButton = ({
  toggleShareScreen,
  isSharingScreen,
}: ScreenShareButtonProps): ReactElement => {
  const title = isSharingScreen ? 'Stop screen share' : 'Start screen share';

  return (
    <div className={`hidden ${displayOnDesktop()}`}>
      <Tooltip title={title} aria-label="add">
        <ToolbarButton
          onClick={toggleShareScreen}
          icon={
            !isSharingScreen ? (
              <ScreenShare className="text-white" />
            ) : (
              <ScreenOff className="text-red-500" />
            )
          }
        />
      </Tooltip>
    </div>
  );
};

export default ScreenSharingButton;
