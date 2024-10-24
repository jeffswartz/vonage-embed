import { Grid, Grow, Paper, Popper, Tooltip } from '@mui/material';
import { EmojiEmotions } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { ClickAwayListener, PopperChildrenProps } from '@mui/base';
import ToolbarButton from '../ToolbarButton';
import emojiMap from '../../../utils/emojis';
import SendEmojiButton from '../SendEmojiButton';
import displayOnDesktop from '../../../utils/displayOnDesktop';

const EmojiGrid = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className={`hidden ${displayOnDesktop()}`}>
      <Tooltip title="Express yourself" aria-label="open sendable emoji menu">
        <ToolbarButton
          onClick={handleToggle}
          icon={<EmojiEmotions style={{ color: `${!open ? 'white' : 'rgb(138, 180, 248)'}` }} />}
          ref={anchorRef}
        />
      </Tooltip>

      <Popper open={open} anchorEl={anchorRef.current} transition disablePortal placement="bottom">
        {({ TransitionProps, placement }: PopperChildrenProps) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <div className="font-normal text-left flex">
              <ClickAwayListener onClickAway={handleClose}>
                <Paper
                  className="flex justify-center items-center"
                  sx={{
                    backgroundColor: 'rgb(32, 33, 36)',
                    color: '#fff',
                    padding: { xs: 1 },
                    borderRadius: 2,
                    zIndex: 1,
                    transform: 'translateY(-5%)',
                    // Each button is 66px, 8px left and right padding
                    maxWidth: 280,
                    position: 'relative',
                  }}
                >
                  <Grid container spacing={0} display={open ? 'flex' : 'none'}>
                    {Object.values(emojiMap).map((emoji) => {
                      return <SendEmojiButton key={emoji} emoji={emoji} />;
                    })}
                  </Grid>
                </Paper>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default EmojiGrid;
