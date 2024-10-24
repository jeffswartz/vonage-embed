import { renderHook, act, cleanup } from '@testing-library/react';
import { vi, describe, beforeEach, it, expect, afterEach } from 'vitest';
import useSound from '../useSound';

const playMock = vi.fn();
const stopMock = vi.fn();
const unloadMock = vi.fn();

vi.mock('howler', () => ({
  Howl: vi.fn(() => ({
    play: playMock,
    stop: stopMock,
    unload: unloadMock,
  })),
}));

describe('useSound', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    cleanup();
  });

  it('should initialize in the stopped state', async () => {
    const { result } = renderHook(() => useSound());
    expect(result.current.playing).toBe(false);
  });

  it('should be playing when togglePlay is called', () => {
    const { result } = renderHook(() => useSound());

    act(() => {
      result.current.togglePlay();
    });

    expect(playMock).toHaveBeenCalled();
    expect(result.current.playing).toBe(true);
  });

  it('should stop the sound after 3 seconds and reset playing to false', async () => {
    const { result } = renderHook(() => useSound());

    act(() => {
      result.current.togglePlay();
    });

    expect(playMock).toHaveBeenCalled();
    expect(result.current.playing).toBe(true);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(stopMock).toHaveBeenCalled();
    expect(result.current.playing).toBe(false);
  });

  it('should stop playing the sound immediately when togglePlay is called again', async () => {
    const { result } = renderHook(() => useSound());

    act(() => {
      result.current.togglePlay();
    });

    expect(result.current.playing).toBe(true);

    act(() => {
      result.current.togglePlay();
    });

    expect(stopMock).toHaveBeenCalled();
    expect(result.current.playing).toBe(false);
  });

  it('should clean up the sound and timer when the component unmounts', async () => {
    const { result, unmount } = renderHook(() => useSound());

    act(() => {
      result.current.togglePlay();
    });

    expect(playMock).toHaveBeenCalled();
    expect(result.current.playing).toBe(true);

    unmount();

    expect(unloadMock).toHaveBeenCalled();
    expect(stopMock).toHaveBeenCalled();

    // this checks that no active timers remain
    expect(vi.getTimerCount()).toBe(0);
  });
});
