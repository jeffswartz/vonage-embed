import { describe, expect, it, vi, Mock } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Publisher } from '@opentok/client';
import EventEmitter from 'events';
import useUserContext from '../../../hooks/useUserContext';
import { UserContextType } from '../../user';
import usePublisherQuality from './usePublisherQuality';

vi.mock('../../../hooks/useUserContext.tsx');

const mockUseUserContext = useUserContext as Mock<[], UserContextType>;

const mockUserContext = {
  user: {
    issues: {
      audioFallbacks: 0,
    },
  },
} as UserContextType;
mockUseUserContext.mockImplementation(() => mockUserContext);

describe('usePublisherQuality', () => {
  it('should set quality to good on videoEnabled event', async () => {
    const mockPublisher = new EventEmitter();
    const { result } = renderHook(() => usePublisherQuality(mockPublisher as unknown as Publisher));
    act(() => mockPublisher.emit('videoEnabled'));
    await waitFor(() => expect(result.current).toBe('good'));
  });

  it('should set quality to good on videoDisableWarningLifted event', async () => {
    const mockPublisher = new EventEmitter();
    const { result } = renderHook(() => usePublisherQuality(mockPublisher as unknown as Publisher));
    act(() => mockPublisher.emit('videoDisableWarningLifted'));
    await waitFor(() => expect(result.current).toBe('good'));
  });

  it('should set quality to good on videoDisabled event', async () => {
    const mockPublisher = new EventEmitter();
    const { result } = renderHook(() => usePublisherQuality(mockPublisher as unknown as Publisher));
    act(() => mockPublisher.emit('videoDisabled'));
    await waitFor(() => expect(result.current).toBe('bad'));
    expect(mockUseUserContext().user.issues.audioFallbacks).toBe(1);
  });

  it('should set quality to good on videoDisableWarning event', async () => {
    const mockPublisher = new EventEmitter();
    const { result } = renderHook(() => usePublisherQuality(mockPublisher as unknown as Publisher));
    act(() => mockPublisher.emit('videoDisableWarning'));
    await waitFor(() => expect(result.current).toBe('poor'));
  });
});
