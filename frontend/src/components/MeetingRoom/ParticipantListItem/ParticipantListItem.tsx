import { Avatar, ListItem, Typography } from '@mui/material';
import { ReactElement } from 'react';
import ParticipantAudioIndicator from '../ParticipantListAudioIndicator';

type ParticipantListItemProps = {
  name: string;
  initials: string;
  hasAudio?: boolean;
  audioLevel?: number;
  dataTestId: string;
  avatarColor: string;
};

/**
 * ParticipantListItem component
 * List Item displaying a participant's Avatar, name, and audio enabled icon for the Participant List
 * @param {ParticipantListItemProps} props - the props for this component
 *  @property {number} [audioLevel] - participants audio level
 *  @property {string} avatarColor - color for initials avatar
 *  @property {string} initials - participant initials
 *  @property {boolean} hasAudio - participant's audio enabled status
 *  @property {string} name - participant name
 *  @property {string} dataTestId - id for testing
 * @returns {ReactElement} ParticipantListItem
 */
const ParticipantListItem = ({
  audioLevel,
  avatarColor,
  initials,
  hasAudio,
  name,
  dataTestId,
}: ParticipantListItemProps): ReactElement => {
  return (
    <ListItem
      sx={{ height: '56px' }}
      data-testid={dataTestId}
      secondaryAction={<ParticipantAudioIndicator audioLevel={audioLevel} hasAudio={hasAudio} />}
    >
      <Avatar
        sx={{
          bgcolor: avatarColor,
          width: '32px',
          height: '32px',
          fontSize: '14px',
        }}
      >
        {initials}
      </Avatar>
      <Typography
        data-testid="participant-list-name"
        variant="inherit"
        noWrap
        sx={{ marginLeft: '12px' }}
      >
        {name}
      </Typography>
    </ListItem>
  );
};

export default ParticipantListItem;
