import { SessionStorage } from './sessionStorage';

class InMemorySessionStorage implements SessionStorage {
  sessions: { [key: string]: string } = {};
  roomNames: string[] = [];
  async getSession(roomName: string): Promise<string | null> {
    return this.sessions[roomName] || null;
  }

  async setSession(roomName: string, sessionId: string): Promise<void> {
    this.roomNames.push(roomName);
    this.sessions[roomName] = sessionId;
  }

  async listRooms(): Promise<string[] | null> {
    return this.roomNames;
  }
}
export default InMemorySessionStorage;
