import { vcr } from '@vonage/vcr-sdk';
import { SessionStorage } from './sessionStorage';

class VcrSessionStorage implements SessionStorage {
  dbState = vcr.getInstanceState();
  async getSession(roomName: string): Promise<string | null> {
    const session: string | null = await this.dbState.get(`sessions:${roomName}`);
    if (!session) {
      return null;
    }
    // setting expiry of 4 hours for the key. After this time
    // if you try to access a room, you will land on a different session Id.
    await this.dbState.expire(`sessions:${roomName}`, 60 * 60 * 4);
    return session;
  }

  async setSession(roomName: string, sessionId: string): Promise<void> {
    await this.dbState.set(`sessions:${roomName}`, sessionId);
    // setting expiry on the set command in case the room is
    // created before hand but never accessed.
    await this.dbState.expire(`sessions:${roomName}`, 60 * 60 * 4);
  }

  async listRooms(): Promise<string[] | null> {
    return [];
  }
}
export default VcrSessionStorage;
