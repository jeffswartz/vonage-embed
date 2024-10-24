import { EmbedProps } from '../types/embed';

export interface SessionStorage {
  getSession(roomName: string): Promise<string | null>;
  listRooms(): Promise<string[] | null>;
  setSession(roomName: string, sessionId: string, embedProps?: EmbedProps): Promise<void>;
}
