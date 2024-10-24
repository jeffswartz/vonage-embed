import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import useRoomName from '../../../hooks/useRoomName';
import ToolbarButton from '../ToolbarButton';
import displayOnDesktop from '../../../utils/displayOnDesktop';
import ArchivingDialog from '../ArchivingDialog';
import { startArchiving, stopArchiving } from '../../../api/archiving';
import useSessionContext from '../../../hooks/useSessionContext';

const ArchivingToggleButton = () => {
  const roomName = useRoomName();
  const { archiveId } = useSessionContext();
  const isRecording = !!archiveId;
  const [isModalOpen, setIsModelOpen] = useState<boolean>(false);
  const title = isRecording ? 'Stop recording' : 'Start recording';
  const handleButtonClick = () => {
    setIsModelOpen((prev) => !prev);
  };

  const handleDialogClick = async (action: 'start' | 'stop') => {
    if (action === 'start') {
      if (!archiveId && roomName) {
        try {
          await startArchiving(roomName);
        } catch (err) {
          console.log(err);
        }
      }
    } else if (archiveId && roomName) {
      stopArchiving(roomName, archiveId);
    }
  };
  return (
    <div className={`hidden ${displayOnDesktop()}`}>
      <Tooltip title={title} aria-label="video layout">
        <ToolbarButton
          onClick={handleButtonClick}
          icon={
            <RadioButtonCheckedIcon
              style={{ color: `${isRecording ? 'rgb(239 68 68)' : 'white'}` }}
            />
          }
        />
      </Tooltip>
      <ArchivingDialog
        isOpen={isModalOpen}
        setIsOpen={setIsModelOpen}
        isArchiving={isRecording}
        handleClick={handleDialogClick}
      />
    </div>
  );
};
export default ArchivingToggleButton;
