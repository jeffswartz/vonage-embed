import { Avatar, SxProps } from '@mui/material';
import { ReactElement } from 'react';
import getParticipantColor from '../../utils/getParticipantColor';

type InitialsProps = {
  initials?: string;
  username?: string;
  sx?: SxProps;
  height?: number;
  width?: number;
};

/**
 * AvatarInitials Component
 *
 * This component returns the avatar for the given initials
 * @param {InitialsProps} props - the props for the component.
 * @param {string} props.initials - (optional) the initials for which the avatar is generated.
 * @param {string} props.username - (optional) the username is used to determine the avatar color.
 * @param {SxProps} props.sx - the styling properties of the parent component.
 * @param {number} props.height - (optional) the height of the avatar.
 * @param {number} props.width - (optional) the width of the avatar.
 * @returns {ReactElement} The avatar initials component.
 */
const AvatarInitials = ({
  initials = '',
  username = '',
  sx = {},
  height = 80,
  width = 80,
}: InitialsProps): ReactElement => {
  const diameter = Math.min(height, width) * 0.53;

  return (
    <Avatar
      sx={{
        bgcolor: getParticipantColor(username),
        width: `${diameter}px`,
        height: `${diameter}px`,
        fontSize: `${diameter / 3}pt`,
        position: 'absolute',
        margin: 'auto',
        ...sx,
      }}
    >
      {initials}
    </Avatar>
  );
};

export default AvatarInitials;
