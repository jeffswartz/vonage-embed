import { ReactElement, useEffect, useRef } from 'react';
import { Box } from 'opentok-layout-js';
import { Publisher } from '@opentok/client';
import VideoTile from '../VideoTile';
import ScreenShareNameDisplay from '../../ScreenShareNameDisplay';

type PublisherProps = {
  box: Box | undefined;
  element: HTMLElement | HTMLObjectElement | undefined;
  publisher: Publisher | null;
};

/**
 * ScreenSharePublisher Component
 * Video Tile for local screen share publisher
 * @param {PublisherProps} props - the props for this component
 *   @property {Box} box - Box specifying position and size of Video Tile
 *   @property {HTMLElement | HTMLObjectElement | undefined} element - VideoElement
 *   @property {Publisher | null} publisher-- Publisher object for local screen share
 * @returns {ReactElement | undefined} - ScreenSharePublisher Component
 */
const ScreenSharePublisher = ({
  box,
  element,
  publisher,
}: PublisherProps): ReactElement | undefined => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (element && containerRef.current) {
      element.classList.add('w-full', 'absolute', 'rounded-xl', 'object-cover');
      containerRef.current.appendChild(element);
    }
  }, [element]);
  const streamName = publisher?.stream?.name ?? '';
  return (
    box && (
      <VideoTile
        id="screen-publisher-container"
        box={box}
        data-testid="screen-publisher-container"
        hasVideo
        ref={containerRef}
      >
        <ScreenShareNameDisplay name={streamName} box={box} />
      </VideoTile>
    )
  );
};

export default ScreenSharePublisher;
