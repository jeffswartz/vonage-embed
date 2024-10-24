import { CSSProperties } from 'react';
import { Chip } from '@mui/material';
import { EmojiWrapper } from '../../../hooks/useEmoji';
import { EMOJI_DISPLAY_DURATION } from '../../../utils/constants';

type EmojiProps = {
  emojiWrapper: EmojiWrapper;
};

const Emoji = ({ emojiWrapper }: EmojiProps) => {
  const { emoji, name } = emojiWrapper;
  const style: CSSProperties = {
    position: 'absolute',
    animationName: 'moveEmoji',
    // Adding an extra 100ms to ensure the emoji does not re-render at bottom of page on animation end
    animationDuration: `${EMOJI_DISPLAY_DURATION + 100}ms`,
    animationTimingFunction: 'linear',
    animationIterationCount: 1,
    maxWidth: '35%',
  };

  return (
    <div style={style} className="emoji ml-5 md:ml-[15%] text-5xl md:text-6xl flex flex-col">
      {emoji}
      <Chip
        label={name}
        size="small"
        sx={{
          color: 'white',
          backgroundColor: 'rgba(60, 64, 67, 0.55)',
        }}
        className="text-sm md:text-lg truncate"
      />
    </div>
  );
};

export default Emoji;
