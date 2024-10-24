import { Close } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { ReactElement } from 'react';

type RightPanelTitleProps = {
  handleClose: () => void;
  title: string;
};

/**
 * RightPanelTitle component
 * Renders the title for the RightPanel component with a text title and an X icon to close the panel
 * @param {RightPanelTitleProps} props - the Props
 *  @property {() => void} handleClose - click handler for X icon
 *  @property {string} title - Title to display
 *  }
 * @returns {ReactElement} - RightPanelTitle component
 */
const RightPanelTitle = ({ handleClose, title }: RightPanelTitleProps): ReactElement => {
  return (
    <div className="h-[64px] flex flex-row items-center justify-between pl-6 w-inherit">
      <span className="font-normal text-lg text-darkGray tracking-normal">{title}</span>
      <IconButton onClick={handleClose} size="large" sx={{ color: 'rgb(95, 99, 104)' }}>
        <Close />
      </IconButton>
    </div>
  );
};

export default RightPanelTitle;
