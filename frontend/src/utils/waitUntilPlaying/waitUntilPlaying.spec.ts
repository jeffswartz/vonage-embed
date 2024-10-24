import { describe, expect, it } from 'vitest';
import waitUntilPlaying from '.';
import { delay } from '../async';

describe('waitUntilPlaying', () => {
  it('should resolve on timeupdate event', async () => {
    const videoElem = document.createElement('video');
    let resolved = false;
    waitUntilPlaying(videoElem).then(() => {
      resolved = true;
    });
    await delay(0);
    expect(resolved).toBe(false);
    videoElem.dispatchEvent(new Event('timeupdate'));
    await delay(0);
    expect(resolved).toBe(true);
  });

  it('should resolve on loadedmetadata event', async () => {
    const videoElem = document.createElement('video');
    let resolved = false;
    waitUntilPlaying(videoElem).then(() => {
      resolved = true;
    });
    await delay(0);
    expect(resolved).toBe(false);
    videoElem.dispatchEvent(new Event('loadedmetadata'));
    await delay(0);
    expect(resolved).toBe(true);
  });
  it('should resolve after timeout if no event fired', async () => {
    const videoElem = document.createElement('video');
    let resolved = false;
    waitUntilPlaying(videoElem, 50).then(() => {
      resolved = true;
    });
    await delay(0);
    expect(resolved).toBe(false);
    await delay(50);
    expect(resolved).toBe(true);
  });
});
