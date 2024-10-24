import { Chip } from '@mui/material';
import { Box } from 'opentok-layout-js';

type ScreenShareNameDisplayProps = {
  name: string;
  box: Box;
};

const ScreenShareNameDisplay = ({ name, box }: ScreenShareNameDisplayProps) => {
  return (
    <Chip
      label={name}
      size="small"
      sx={{
        color: 'white',
        backgroundColor: 'rgba(60, 64, 67, 0.55)',
        maxWidth: box.width - 32,
      }}
      className="absolute text-sm md:text-lg truncate bottom-[10px] left-[10px]"
    />
  );
};

export default ScreenShareNameDisplay;
