import { Howl } from 'howler';
import { useRef, useEffect, useState } from 'react';

type UseSoundType = {
  playing: boolean;
  togglePlay: () => void;
};

/**
 * Hook to handle playing an audio file to test a user's audio output device.
 * @returns {UseSoundType} An object containing:
 * - `playing` {boolean} - Whether the audio file is playing or not.
 * - `togglePlay` {() => void} - Toggles the audio file between playing and stopped.
 */
const useSound = (): UseSoundType => {
  const sound = useRef<Howl | null>(null);
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    sound.current = new Howl({
      src: [`${window.location.origin}/sound.mp3`],
      loop: true,
      volume: 0.5,
      html5: true,
    });

    // Cleanup the sound on unmount
    return () => {
      if (sound.current) {
        sound.current.stop();
        sound.current.unload();
      }

      if (timerRef.current !== null) {
        setPlaying(false);
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const togglePlay = () => {
    if (!sound.current) {
      return;
    }
    if (playing) {
      sound.current.stop();
      setPlaying(false);
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    } else {
      sound.current.play();
      timerRef.current = window.setTimeout(() => {
        if (sound.current) {
          sound.current.stop();
        }
        setPlaying(false);
      }, 3000);
      setPlaying(true);
    }
  };

  return {
    playing,
    togglePlay,
  };
};

export default useSound;
