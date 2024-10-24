import dotenv from 'dotenv';
import path from 'path';
import { Config } from '../types/config';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const loadConfig = (): Config => {
  const provider = process.env.VIDEO_SERVICE_PROVIDER || 'opentok';
  if (provider === 'vonage') {
    const applicationId = process.env.VONAGE_APP_ID || '';
    const privateKey = process.env.VONAGE_PRIVATE_KEY || '';

    if (!applicationId || !privateKey) {
      throw new Error('Missing config values for Vonage');
    }

    return { applicationId, privateKey, provider: 'vonage' };
  }
  if (provider === 'opentok') {
    const apiKey = process.env.OT_API_KEY || '';
    const apiSecret = process.env.OT_API_SECRET || '';

    if (!apiKey || !apiSecret) {
      throw new Error('Missing config values for OpenTok');
    }

    return { apiKey, apiSecret, provider: 'opentok' };
  }
  throw new Error('Unknown video service provider');
};

export default loadConfig;
