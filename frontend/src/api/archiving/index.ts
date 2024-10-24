import { Archive, createArchiveFromServer, hasPending } from './model';
import { listArchives, startArchiving, stopArchiving } from './routes';

export type ArchiveResponse = {
  archives: Archive[];
  hasPending: boolean;
};

const getArchives = async (roomName: string): Promise<ArchiveResponse> => {
  const response = await listArchives(roomName);
  const archivesFromServer = response?.data?.archives;
  if (archivesFromServer instanceof Array) {
    const archives = archivesFromServer.map((archiveFromServer) =>
      createArchiveFromServer(archiveFromServer)
    );
    return {
      archives,
      hasPending: hasPending(archives),
    };
  }
  return {
    archives: [],
    hasPending: false,
  };
};

export { startArchiving, stopArchiving, getArchives };
