import { useEffect, useRef, useState } from 'react';
import { ArchiveResponse, getArchives } from '../api/archiving';
import { Archive } from '../api/archiving/model';

type UseArchivesProps = {
  roomName: string;
};

const useArchives = ({ roomName }: UseArchivesProps) => {
  const [archives, setArchives] = useState<Archive[] | 'error'>([]);
  const pollingIntervalRef = useRef<ReturnType<typeof setInterval> | undefined>();

  useEffect(() => {
    const fetchArchives = async () => {
      if (roomName) {
        let archiveData: ArchiveResponse;
        try {
          archiveData = await getArchives(roomName);
        } catch (err) {
          setArchives('error');
          return;
        }
        // If we have archives not yet available for download we poll the API every 5s to see if its' available.
        if (archiveData.hasPending && pollingIntervalRef.current === undefined) {
          pollingIntervalRef.current = setInterval(() => {
            fetchArchives();
          }, 5000);
        } else if (!archiveData.hasPending && pollingIntervalRef.current !== undefined) {
          clearInterval(pollingIntervalRef.current);
          pollingIntervalRef.current = undefined;
        }
        setArchives(archiveData.archives);
      }
    };
    fetchArchives();
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [roomName]);
  return archives;
};

export default useArchives;
