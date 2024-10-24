import { useState, useEffect, MouseEvent, ReactElement } from 'react';
import usePreviewPublisherContext from '../../hooks/usePreviewPublisherContext';
import ControlPanel from '../../components/WaitingRoom/ControlPanel';
import VideoContainer from '../../components/WaitingRoom/VideoContainer';
import UsernameInput from '../../components/WaitingRoom/UserNameInput';
import { DEVICE_ACCESS_STATUS } from '../../utils/constants';
import DeviceAccessAlert from '../../components/DeviceAccessAlert';
import Banner from '../../components/Banner';

/**
 * WaitingRoom Component
 *
 * This component renders the waiting room page of the application, including:
 * - A banner containing a company logo, a date-time widget, and a navigable button to a GitHub repo.
 * - A video element showing the user how they'll appear upon joining a room containing controls to:
 *   - Mute their audio input device.
 *   - Disable their video input device.
 *   - Toggle on/off background blur (if supported).
 * - Audio input, audio output, and video input device selectors.
 * - A username input field.
 * - The meeting room name and a button to join the room.
 * @returns {ReactElement} - The waiting room.
 */
const WaitingRoom = (): ReactElement => {
  const { initLocalPublisher, publisher, accessStatus, destroyPublisher } =
    usePreviewPublisherContext();
  const [pubInit, setPubInit] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openAudioInput, setAudioInputOpen] = useState<boolean>(false);
  const [openVideoInput, setVideoInputOpen] = useState<boolean>(false);
  const [openAudioOutput, setOpenAudioOutput] = useState<boolean>(false);
  const [username, setUsername] = useState(window.localStorage.getItem('username') || '');

  useEffect(() => {
    if (!publisher) {
      initLocalPublisher();
      setPubInit(true);
    }
  }, [initLocalPublisher, publisher, pubInit]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    const selection = event.currentTarget.textContent;

    if (selection === 'Microphone') {
      setAudioInputOpen(true);
    }
    if (selection === 'Camera') {
      setVideoInputOpen(true);
    }
    if (selection === 'Speaker') {
      setOpenAudioOutput(true);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAudioInputOpen(false);
    setOpenAudioOutput(false);
    setVideoInputOpen(false);
  };

  return (
    <div className="h-full bg-white w-full flex flex-col">
      <Banner />
      <div className="flex w-full min-h-[664px]">
        <div className="min-h-full w-full flex justify-center">
          <div className="sm:min-h-[90vh] min-h-[80vh] flex flex-col md:flex-row items-center justify-center w-full">
            <div className="flex-col max-w-full w-[508x] h-[420px] inline-flex">
              <VideoContainer username={username} />
              {accessStatus === DEVICE_ACCESS_STATUS.ACCEPTED && (
                <ControlPanel
                  handleClick={handleClick}
                  handleClose={handleClose}
                  openAudioInput={openAudioInput}
                  openVideoInput={openVideoInput}
                  openAudioOutput={openAudioOutput}
                  anchorEl={anchorEl}
                />
              )}
            </div>
            <UsernameInput
              onJoinRoomClick={destroyPublisher}
              username={username}
              setUsername={setUsername}
            />
          </div>
        </div>
        {accessStatus !== DEVICE_ACCESS_STATUS.ACCEPTED && (
          <DeviceAccessAlert accessStatus={accessStatus} />
        )}
      </div>
    </div>
  );
};

export default WaitingRoom;
