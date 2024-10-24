import { beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import OTKAnalytics from 'opentok-solutions-logging';
import logOnConnect from './logOnConnect';

vi.mock('opentok-solutions-logging');

describe('logOnConnect', () => {
  const apiKey = 'api-key';
  const sessionId = 'session-id';
  const logEventSpy: Mock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    vi.mocked(OTKAnalytics).mockImplementation(() => ({
      addSessionInfo: vi.fn(),
      logEvent: logEventSpy,
    }));
  });

  it('does not initialize OTKAnalytics when not connected', () => {
    const connectionId = undefined;
    logOnConnect(apiKey, sessionId, connectionId);

    expect(OTKAnalytics).not.toBeCalled();
  });

  it('calls logEvent when connected to a session', () => {
    const connectionId = 'connection-id';
    logOnConnect(apiKey, sessionId, connectionId);

    expect(OTKAnalytics).toBeCalled();
    expect(logEventSpy).toBeCalled();
  });
});
