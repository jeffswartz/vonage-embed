import { beforeEach, describe, expect, it, vi } from 'vitest';
import SpeakingDetector from './speakingDetector';
import { waitForEvent } from '../async';

const mockGetUserMedia = vi.fn(() =>
  Promise.resolve({
    getTracks: vi.fn(() => [
      {
        stop: vi.fn(),
      },
    ]),
  })
);

const mockCreateMediaStreamSource = vi.fn(() => ({
  connect: vi.fn(),
  disconnect: vi.fn(),
}));

const mockAnalyser = {
  connect: vi.fn(),
  disconnect: vi.fn(),
  getByteTimeDomainData: vi.fn(),
  fftSize: 2048,
};

const mockAudioContext = vi.fn().mockImplementation(() => ({
  createMediaStreamSource: mockCreateMediaStreamSource,
  createAnalyser: vi.fn(() => mockAnalyser),
  close: vi.fn(),
}));

beforeEach(() => {
  Object.defineProperty(navigator, 'mediaDevices', {
    writable: true,
    value: {
      getUserMedia: mockGetUserMedia,
    },
  });

  global.AudioContext = mockAudioContext;
  vi.clearAllMocks();
});

describe('SpeakingDetector', () => {
  let now = Date.now();
  const dateNowSpy = vi.spyOn(global.Date, 'now').mockReturnValue(now);
  const advanceDateNow = (ms: number) => {
    now += ms;
    dateNowSpy.mockReturnValue(now);
  };
  it('should detect speaking while muted and turn off the notification 3 seconds later', async () => {
    const speakingDetector = new SpeakingDetector({
      selectedMicrophoneId: '132322',
    });
    const isSpeakingDetectorSpy = vi.fn();
    const isSpeakingDetectorOffSpy = vi.fn();
    const waitForIsSpeakingWhileMuted = waitForEvent(
      speakingDetector,
      'isSpeakingWhileMuted',
      isSpeakingDetectorSpy
    );
    const waitForIsSpeakingWhileMutedOff = waitForEvent(
      speakingDetector,
      'isSpeakingWhileMutedOff',
      isSpeakingDetectorOffSpy
    );

    await waitForIsSpeakingWhileMuted;
    expect(isSpeakingDetectorSpy).toHaveBeenCalled();
    // Advance time and wait for speaking off detection
    advanceDateNow(3000);
    await waitForIsSpeakingWhileMutedOff;
    expect(isSpeakingDetectorOffSpy).toHaveBeenCalled();
  });
});
