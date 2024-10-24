import { describe, expect, it, vi, Mock } from 'vitest';
import { renderHook } from '@testing-library/react';
import OT from '@opentok/client';
import useUserContext from '../../../hooks/useUserContext';
import { UserContextType } from '../../user';
import usePublisherOptions from './usePublisherOptions';

vi.mock('../../../hooks/useUserContext.tsx');

const mockUseUserContext = useUserContext as Mock<[], UserContextType>;

const defaultSettings = {
  publishAudio: false,
  publishVideo: false,
  name: '',
  blur: false,
  noiseSuppression: true,
  audioSource: undefined,
  videoSource: undefined,
};

const customSettings = {
  publishAudio: true,
  publishVideo: true,
  name: 'Foo Bar',
  blur: true,
  noiseSuppression: false,
  audioSource: '68f1d1e6f11c629b1febe51a95f8f740f8ac5cd3d4c91419bd2b52bb1a9a01cd',
  videoSource: 'a68ec4e4a6bc10dc572bd806414b0da27d0aefb0ad822f7ba4cf9b226bb9b7c2',
};

const mockUserContextWithDefaultSettings = {
  user: {
    defaultSettings,
  },
} as UserContextType;

const mockUserContextWithCustomSettings = {
  user: {
    defaultSettings: customSettings,
  },
} as UserContextType;

describe('usePublisherOptions', () => {
  it('should use default settings', async () => {
    vi.spyOn(OT, 'hasMediaProcessorSupport').mockReturnValue(true);
    mockUseUserContext.mockImplementation(() => mockUserContextWithDefaultSettings);
    const { result } = renderHook(() => usePublisherOptions());
    expect(result.current).toEqual({
      resolution: '1280x720',
      publishAudio: false,
      publishVideo: false,
      audioSource: undefined,
      videoSource: undefined,
      insertDefaultUI: false,
      audioFallback: {
        publisher: true,
      },
      audioFilter: {
        type: 'advancedNoiseSuppression',
      },
      videoFilter: undefined,
      name: '',
      initials: '',
    });
  });

  it('should not have advanced noise suppression if not supported by browser', async () => {
    vi.spyOn(OT, 'hasMediaProcessorSupport').mockReturnValue(false);
    mockUseUserContext.mockImplementation(() => mockUserContextWithDefaultSettings);
    const { result } = renderHook(() => usePublisherOptions());
    expect(result.current.audioFilter).toBe(undefined);
  });

  it('should use custom settings', async () => {
    vi.spyOn(OT, 'hasMediaProcessorSupport').mockReturnValue(true);
    mockUseUserContext.mockImplementation(() => mockUserContextWithCustomSettings);
    const { result } = renderHook(() => usePublisherOptions());
    expect(result.current).toEqual({
      resolution: '1280x720',
      publishAudio: true,
      publishVideo: true,
      audioSource: '68f1d1e6f11c629b1febe51a95f8f740f8ac5cd3d4c91419bd2b52bb1a9a01cd',
      videoSource: 'a68ec4e4a6bc10dc572bd806414b0da27d0aefb0ad822f7ba4cf9b226bb9b7c2',
      insertDefaultUI: false,
      audioFallback: {
        publisher: true,
      },
      audioFilter: undefined,
      videoFilter: {
        type: 'backgroundBlur',
        blurStrength: 'high',
      },
      name: 'Foo Bar',
      initials: 'FB',
    });
  });
});
