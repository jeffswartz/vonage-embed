import { Button } from '@mui/material';
import { MouseEvent, ReactElement, TouchEvent } from 'react';

type GoToLandingPageButtonProps = {
  handleLanding: (event: MouseEvent<HTMLButtonElement> | TouchEvent<HTMLButtonElement>) => void;
};

/**
 * GoToLandingPageButton Component
 *
 * This component returns a button that takes a user back to the landing page
 * @param {GoToLandingPageButtonProps} props - the props for this component.
 * @param {Function} props.handleLanding - the function that handles the action of going back to the landing page.
 * @returns {ReactElement} - the button to go back to the landing page.
 */
const GoToLandingPageButton = ({ handleLanding }: GoToLandingPageButtonProps): ReactElement => {
  return (
    <Button
      variant="contained"
      className="h-12"
      sx={{ textTransform: 'none', fontSize: '1rem', marginBottom: '16px' }}
      onClick={handleLanding}
    >
      Return to landing page
    </Button>
  );
};

export default GoToLandingPageButton;
