import { useRef, useState, useEffect, ReactElement } from 'react';
import { Stack } from '@mui/material';
import MicToggleButton from '../MicToggleButton';
import CameraToggleButton from '../CameraToggleButton';
import BlurToggleButton from '../BlurToggleButton';
import VideoLoading from '../VideoLoading';
import waitUntilPlaying from '../../../utils/waitUntilPlaying';
import useUserContext from '../../../hooks/useUserContext';
import usePreviewPublisherContext from '../../../hooks/usePreviewPublisherContext';
import getInitials from '../../../utils/getInitials';
import PreviewAvatar from '../PreviewAvatar';
import VoiceIndicatorIcon from '../../MeetingRoom/VoiceIndicator/VoiceIndicator';

type VideoContainerProps = {
  username: string;
};

/**
 * VideoContainer Component
 *
 * Loads and displays the preview publisher, a representation of what participants would see in the meeting room.
 * Overlaid onto the preview publisher are the audio input toggle button, video input toggle button, and the background blur toggle button (if supported).
 * @param {VideoContainerProps} props - The props for the component.
 * @param {string} props.username - The user's username.
 * @returns {ReactElement} - The VideoContainer component.
 */
const VideoContainer = ({ username }: VideoContainerProps): ReactElement => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const { user } = useUserContext();
  const { publisherVideoElement, isVideoEnabled, isAudioEnabled, speechLevel } =
    usePreviewPublisherContext();
  const initials = getInitials(username);

  useEffect(() => {
    if (publisherVideoElement && containerRef.current) {
      containerRef.current.appendChild(publisherVideoElement);
      const myVideoElement = publisherVideoElement as HTMLElement;
      myVideoElement.classList.add('video__element');
      myVideoElement.style.borderRadius = '12px';
      myVideoElement.style.height = '328px';
      myVideoElement.style.width = '584px';
      myVideoElement.style.marginLeft = 'auto';
      myVideoElement.style.marginRight = 'auto';
      myVideoElement.style.transform = 'scaleX(-1)';
      myVideoElement.style.objectFit = 'cover';
      myVideoElement.style.boxShadow =
        '0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15)';

      waitUntilPlaying(publisherVideoElement).then(() => {
        setVideoLoading(false);
      });
    }
  }, [publisherVideoElement]);

  return (
    <div
      className="relative w-[584px] max-w-full h-[328px] flex flex-col items-center justify-center rounded-xl"
      // this was added because overflow: hidden causes issues with rendering
      // see https://stackoverflow.com/questions/77748631/element-rounded-corners-leaking-out-to-front-when-using-overflow-hidden
      style={{ WebkitMask: 'linear-gradient(#000 0 0)' }}
    >
      <div ref={containerRef} />
      <div className="absolute w-[584px] h-[328px] shadow-[inset_0px_64px_30px_-20px_rgba(0,0,0,0.4),inset_0px_-64px_30px_-20px_rgba(0,0,0,0.4)]" />
      {videoLoading && <VideoLoading />}
      <PreviewAvatar
        initials={initials}
        username={user.defaultSettings.name}
        isVideoEnabled={isVideoEnabled}
        isVideoLoading={videoLoading}
      />
      {!videoLoading && (
        <div className="absolute flex items-center justify-center top-[75%] bottom-0 left-0 right-0 h-fit">
          {isAudioEnabled && (
            <div className="absolute left-6 top-8">
              <VoiceIndicatorIcon publisherAudioLevel={speechLevel} size={24} />
            </div>
          )}
          <Stack direction="row" spacing={2}>
            <MicToggleButton />
            <CameraToggleButton />
          </Stack>
          <div className="absolute right-[20px]">
            <BlurToggleButton />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoContainer;
