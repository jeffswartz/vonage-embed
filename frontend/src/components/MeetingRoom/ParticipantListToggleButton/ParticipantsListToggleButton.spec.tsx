import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ParticipantListToggleButton from './ParticipantListToggleButton';

describe('ParticipantListToggleButton', () => {
  it('should show participant number', () => {
    render(
      <ParticipantListToggleButton handleClick={() => {}} isOpen={false} participantCount={10} />
    );
    expect(screen.getByText('10')).toBeVisible();
  });
  it('should have a white icon when the list is closed', () => {
    render(
      <ParticipantListToggleButton handleClick={() => {}} isOpen={false} participantCount={10} />
    );
    expect(screen.getByTestId('PeopleIcon')).toHaveStyle('color: rgb(255, 255, 255)');
  });
  it('should have a blue icon when the list is open', () => {
    render(<ParticipantListToggleButton handleClick={() => {}} isOpen participantCount={10} />);
    expect(screen.getByTestId('PeopleIcon')).toHaveStyle('color: rgb(130, 177, 255)');
  });
  it('should invoke callback on click', () => {
    const handleClick = vi.fn();
    render(<ParticipantListToggleButton handleClick={handleClick} isOpen participantCount={10} />);
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
