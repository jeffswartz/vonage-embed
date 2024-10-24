import { Avatar } from '@mui/material';
import { ReactElement } from 'react';
import AvatarInitials from '../../AvatarInitials';

type PreviewAvatarProps = {
  username: string;
  initials: string;
  isVideoEnabled: boolean;
  isVideoLoading: boolean;
};

/**
 * PreviewAvatar Component
 *
 * Displays the initials for a user if initials are available, an empty avatar if initials are unavailable, or nothing if the user is publishing video or the publisher is initializing.
 * @param {PreviewAvatarProps} props - The props for the component.
 * @param {string} props.username - The user's username.
 * @param {string} props.initials - The user's initials.
 * @param {boolean} props.isVideoEnabled - Whether the user is publishing video.
 * @param {boolean} props.isVideoLoading - Whether the preview publisher is initialized.
 * @returns {ReactElement | null} - The PreviewAvatar component or `null`.
 */
const PreviewAvatar = ({
  initials,
  username,
  isVideoEnabled,
  isVideoLoading,
}: PreviewAvatarProps): ReactElement | null => {
  if (isVideoEnabled || isVideoLoading) {
    return null;
  }

  return initials ? (
    <AvatarInitials
      initials={initials}
      sx={{
        position: 'absolute',
        zIndex: isVideoEnabled ? 0 : 1,
      }}
      username={username}
      height={328}
      width={584}
    />
  ) : (
    <Avatar
      sx={{
        bgcolor: '#4caf50',
        position: 'absolute',
        margin: 'auto',
        width: '174px',
        height: '174px',
        fontSize: '58pt',
      }}
    />
  );
};

export default PreviewAvatar;
