import { SessionStorage } from './sessionStorage';
import admin from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';
import { EmbedProps } from '../types/embed';

const fbDatabaseUrl = 'https://vg-embed-demo-default-rtdb.firebaseio.com/';
const firebaseConfig = {
  credential: applicationDefault(), // set GOOGLE_APPLICATION_CREDENTIALS env var.
  databaseURL: fbDatabaseUrl,
};
const app = admin.initializeApp(firebaseConfig);
const db = admin.database();

class FirebaseSessionStorage implements SessionStorage {
  sessions: { [key: string]: string } = {};
  embedIds: string[] = [];

  async getSession(roomName: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      let sessionId = null;
      db.ref(`embeds/${roomName}/sessionId`).once('value', snapshot => {
        sessionId = snapshot.val();
        resolve(sessionId);
      });
    })
  }

  async setSession(roomName: string, sessionId: string, embedProps?: EmbedProps): Promise<void> {
    this.embedIds.push(roomName);
    db.ref(`embeds/${roomName}`).set({ sessionId,  embedProps });
  }

  async listRooms(): Promise<string[] | null> {
    // to-do: use Firebase
    return this.embedIds;
  }
}
export default FirebaseSessionStorage;
