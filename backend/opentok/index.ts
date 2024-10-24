import OpenTok, { Archive } from 'opentok';
import { VideoService } from '../videoServiceInterface';
import { OpentokConfig } from '../types/config';

class OpenTokVideoService implements VideoService {
  private opentok: OpenTok;

  constructor(private config: OpentokConfig) {
    const { apiKey, apiSecret } = config;
    this.opentok = new OpenTok(apiKey, apiSecret);
  }

  createSessionAndToken(): Promise<{ sessionId: string; token: string }> {
    return new Promise((resolve, reject) => {
      this.opentok.createSession({ mediaMode: 'routed' }, (error, session) => {
        if (error || !session) {
          reject(error);
        } else {
          const { sessionId } = session;
          const token = this.opentok.generateToken(sessionId);
          resolve({ sessionId, token });
        }
      });
    });
  }

  generateToken(sessionId: string): { token: string; apiKey: string } {
    const token = this.opentok.generateToken(sessionId);
    return { token, apiKey: this.config.apiKey };
  }

  startArchive(roomName: string, sessionId: string): Promise<Archive> {
    return new Promise((resolve, reject) => {
      this.opentok.startArchive(
        sessionId,
        {
          name: roomName,
          resolution: '1920x1080',
          layout: {
            type: 'bestFit',
            screenshareType: 'bestFit',
          },
        },
        (error, archive) => {
          if (archive) {
            resolve(archive);
          } else {
            reject(error ?? 'unknown error');
          }
        }
      );
    });
  }

  stopArchive(archiveId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.opentok.stopArchive(archiveId, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(archiveId);
        }
      });
    });
  }

  listArchives(sessionId: string): Promise<OpenTok.Archive[] | undefined> {
    return new Promise((resolve, reject) => {
      const options = { sessionId };
      this.opentok.listArchives(options, (error, archives) => {
        if (error) {
          reject(error);
        } else {
          resolve(archives);
        }
      });
    });
  }

  async getCredentials(): Promise<{ sessionId: string; token: string; apiKey: string }> {
    const { sessionId, token } = await this.createSessionAndToken();
    return { sessionId, token, apiKey: this.config.apiKey };
  }
}

export default OpenTokVideoService;
