import { Button, Grid } from '@mui/material';
import useEmoji from '../../../hooks/useEmoji';

type SendEmojiButtonProps = {
  emoji: string;
};

const SendEmojiButton = ({ emoji }: SendEmojiButtonProps) => {
  const { sendEmoji } = useEmoji();

  return (
    <Grid item xs={3} className="flex justify-center">
      <Button
        size="large"
        onClick={() => sendEmoji(emoji)}
        sx={{
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.12)',
          },
          padding: '0.25rem',
          fontSize: '1.5rem',
        }}
      >
        {emoji}
      </Button>
    </Grid>
  );
};

export default SendEmojiButton;
