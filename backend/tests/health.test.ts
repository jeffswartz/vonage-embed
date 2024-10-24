import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals';
import request from 'supertest';
import { Server } from 'http';

jest.mock('../helpers/config', () => ({
  default: jest.fn().mockReturnValue({
    apiKey: 'test-api-key',
    apiSecret: 'test-api-secret',
    applicationId: 'test-application-id',
    privateKey: 'test-private-key',
    provider: 'opentok',
  }),
}));

const startServer = (await import('../server')).default;

describe('GET /_/health', () => {
  let server: Server;

  beforeAll(async () => {
    server = await startServer();
  });

  afterAll((done) => {
    server.close(done);
  });

  it('returns a 200', async () => {
    const res = await request(server).get('/_/health');
    expect(res.statusCode).toEqual(200);
  });
});
