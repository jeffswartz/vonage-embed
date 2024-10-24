import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DeviceAccessAlert from './DeviceAccessAlert';
import { DEVICE_ACCESS_STATUS } from '../../utils/constants';

describe('DeviceAccessAlert', () => {
  it('should display the correct message and image when access status is PENDING', () => {
    render(<DeviceAccessAlert accessStatus={DEVICE_ACCESS_STATUS.PENDING} />);

    // Check that the correct message is displayed
    expect(
      screen.getByText(
        'To join the video room, your browser will request access to your camera and microphone.'
      )
    ).toBeInTheDocument();

    // Check that the correct image is displayed
    const imgElement = screen.getByAltText('Access Dialog');
    expect(imgElement).toHaveAttribute('src', '/images/access-dialog-pending.png');
  });

  it('should display the correct message and image when access status is DENIED', () => {
    render(<DeviceAccessAlert accessStatus={DEVICE_ACCESS_STATUS.REJECTED} />);

    // Check that the correct message is displayed
    expect(
      screen.getByText(
        'It seems your browser is blocked from accessing your camera and/or microphone.'
      )
    ).toBeInTheDocument();

    // Check that the correct image is displayed
    const imgElement = screen.getByAltText('Access Dialog');
    expect(imgElement).toHaveAttribute('src', '/images/access-dialog-rejected.png');
  });

  it('should not display anything when access status is set to null', () => {
    render(<DeviceAccessAlert accessStatus={null} />);

    // Check that there is no alert displayed
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });
});
