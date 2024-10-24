export type VonageConfig = {
  provider: 'vonage';
  applicationId: string;
  privateKey: string;
};
export type OpentokConfig = {
  provider: 'opentok';
  apiKey: string;
  apiSecret: string;
};

export type Config = VonageConfig | OpentokConfig;
