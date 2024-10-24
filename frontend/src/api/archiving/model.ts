import { getFormattedDate, getFormattedTime } from '../../utils/dateTime';

export type ArchiveStatus = 'available' | 'pending' | 'failed';
type ServerArchiveStatus =
  | 'available'
  | 'expired'
  | 'failed'
  | 'paused'
  | 'started'
  | 'stopped'
  | 'uploaded';

export interface ServerArchive {
  id: string;
  url: string | null;
  status: ServerArchiveStatus;
  createdAt: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [others: string]: any;
}

export type Archive = {
  id: string;
  url: string | null;
  status: ArchiveStatus;
  createdAt: number;
  createdAtFormatted: string;
};

const getDateString = (timestamp: number) => {
  return `${getFormattedDate(timestamp)} ${getFormattedTime(timestamp)}`;
};

const getArchiveStatus = (status: ServerArchiveStatus): ArchiveStatus => {
  switch (status) {
    case 'available':
      return 'available';
    case 'started':
    case 'stopped':
    case 'uploaded':
    case 'paused':
      return 'pending';
    default:
      return 'failed';
  }
};
export const createArchiveFromServer = (serverArchive: ServerArchive): Archive => {
  return {
    id: serverArchive.id,
    url: serverArchive.url,
    status: getArchiveStatus(serverArchive.status),
    createdAt: serverArchive.createdAt,
    createdAtFormatted: getDateString(serverArchive.createdAt),
  };
};

export const hasPending = (archives: Archive[]) =>
  archives.some((archive) => archive.status === 'pending');
