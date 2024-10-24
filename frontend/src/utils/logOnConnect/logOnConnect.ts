import OTKAnalytics from 'opentok-solutions-logging';
import getAppVersion from '../getAppVersion';

const logAction = {
  enterMeeting: 'EnterMeeting',
};

type OTKAnalyticsProps = {
  sessionId?: string;
  partnerId?: string;
  clientVersion: string;
  source: string;
  componentId: 'vera';
  name: 'vera';
};
type OTKAnalyticsSessionInfo = {
  sessionId: string;
  connectionId: string;
  partnerId: string;
};

/**
 * Logs that a user is connecting from Vonage Video React app to track the version being used and to help with any support issues.
 * @param {string} apiKey - The apiKey or applicationId.
 * @param {string} sessionId - The sessionId.
 * @param {string} [connectionId] - The connectionId for the user.
 * @returns {void}
 */
export default (apiKey: string, sessionId: string, connectionId?: string): void => {
  if (!(apiKey && sessionId && connectionId)) {
    return;
  }
  const clientVersion = getAppVersion();

  const otkAnalyticsProps: OTKAnalyticsProps = {
    name: 'vera',
    componentId: 'vera',
    source: window.location.origin,
    clientVersion,
    partnerId: apiKey,
    sessionId,
  };

  const otkAnalytics = new OTKAnalytics(otkAnalyticsProps);
  const sessionInfo: OTKAnalyticsSessionInfo = {
    sessionId,
    connectionId,
    partnerId: apiKey,
  };
  otkAnalytics.addSessionInfo(sessionInfo);

  const data = {
    action: logAction.enterMeeting,
  };

  otkAnalytics.logEvent(data);
};
