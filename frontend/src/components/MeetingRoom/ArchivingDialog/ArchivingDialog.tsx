import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type ArchivingDialogTexts = {
  title: string;
  contents: string;
  primaryActionText: string;
  secondaryActionText: string;
};

const startRecordingText: ArchivingDialogTexts = {
  title: 'Start Recording?',
  contents:
    'Make sure everyone is ready! You can download the recording from the "Goodbye" page after you leave the room.',
  primaryActionText: 'Start Recording',
  secondaryActionText: 'Cancel',
};

const stopRecordingText: ArchivingDialogTexts = {
  title: 'Stop Recording?',
  contents: 'You can download the recording from the "Goodbye" page after you leave the room.',
  primaryActionText: 'Stop Recording',
  secondaryActionText: 'Cancel',
};

type ArchivingDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isArchiving: boolean;
  handleClick: (action: 'start' | 'stop') => Promise<void>;
};

const ArchivingDialog = ({ isOpen, setIsOpen, isArchiving, handleClick }: ArchivingDialogProps) => {
  const texts = isArchiving ? stopRecordingText : startRecordingText;
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleActionClick = () => {
    handleClose();
    handleClick(isArchiving ? 'stop' : 'start');
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{texts.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{texts.contents}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>{texts.secondaryActionText}</Button>
        <Button onClick={handleActionClick} autoFocus>
          {texts.primaryActionText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ArchivingDialog;
