import { IconButton, Link, Tooltip } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';
import { ReactElement } from 'react';

/**
 * GHRepoButton Component
 *
 * Displays a button with a link to the Vonage Video React App GitHub page.
 * @returns {ReactElement} - The GHRepoButton component.
 */
const GHRepoButton = (): ReactElement => {
  return (
    <Link href="https://github.com/Vonage/vonage-video-react-app/" target="_blank">
      <Tooltip title="Visit our GitHub Repo">
        <IconButton color="default">
          <GitHubIcon />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

export default GHRepoButton;
