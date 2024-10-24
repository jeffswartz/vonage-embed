/* eslint-disable no-underscore-dangle */
import { Auth } from '@vonage/auth';
import { LayoutType, MediaMode, SingleArchiveResponse, Video } from '@vonage/video';
import { VideoService } from '../videoServiceInterface';
import { VonageConfig } from '../types/config';

class VonageVideoService implements VideoService {
  private credentials: Auth;
  private vonageVideo: Video;

  constructor(private config: VonageConfig) {
    this.config = config;
    this.credentials = new Auth({
      applicationId: this.config.applicationId,
      privateKey: this.config.privateKey,
    });
    this.vonageVideo = new Video(this.credentials);
  }

  async createSessionAndToken(): Promise<{ sessionId: string; token: string }> {
    const { sessionId } = await this.vonageVideo.createSession({ mediaMode: MediaMode.ROUTED });
    const token = this.vonageVideo.generateClientToken(sessionId);
    return { sessionId, token };
  }

  async listArchives(sessionId: string): Promise<SingleArchiveResponse[]> {
    const archives = await this.vonageVideo.searchArchives({ sessionId });
    return archives.items;
  }

  generateToken(sessionId: string): { token: string; apiKey: string } {
    const token = this.vonageVideo.generateClientToken(sessionId);
    return { token, apiKey: this.config.applicationId };
  }

  async startArchive(roomName: string, sessionId: string): Promise<SingleArchiveResponse> {
    return this.vonageVideo.startArchive(sessionId, {
      name: roomName,
      layout: {
        type: LayoutType.BEST_FIT,
        screenshareType: 'bestFit',
      },
    });
  }

  async stopArchive(archiveId: string): Promise<string> {
    await this.vonageVideo.stopArchive(archiveId);
    return 'Archive stopped successfully';
  }

  async getCredentials(): Promise<{ sessionId: string; token: string; apiKey: string }> {
    const { sessionId, token } = await this.createSessionAndToken();
    return { sessionId, token, apiKey: this.config.applicationId };
  }
}

export default VonageVideoService;
