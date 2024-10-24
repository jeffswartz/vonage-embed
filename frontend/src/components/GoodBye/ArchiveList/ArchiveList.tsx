import WarningOutlinedIcon from '@mui/icons-material/WarningOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import {
  CircularProgress,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Archive, ArchiveStatus } from '../../../api/archiving/model';

const ArchiveDownloadButton = ({ url, id }: { id: string; url: string | undefined }) => {
  return (
    <Link href={url} target="_blank">
      <Tooltip title={`Download recording ${id}`}>
        <IconButton>
          <FileDownloadOutlinedIcon data-testid="archive-download-button" />
        </IconButton>
      </Tooltip>
    </Link>
  );
};

const ArchiveErrorIcon = () => (
  <Tooltip title="This recording failed or is expired">
    <WarningOutlinedIcon
      color="warning"
      sx={{
        alignItems: 'center',
        display: 'flex',
        width: '40px',
        height: '40px',
        padding: '8px',
        justifyContent: 'center',
      }}
      data-testid="archive-error-icon"
    />
  </Tooltip>
);

const ArchivingLoadingIcon = () => (
  <Tooltip title="This recording is not ready for download yet">
    <CircularProgress
      data-testid="archive-loading-spinner"
      sx={{
        padding: '8px',
      }}
    />
  </Tooltip>
);

const ArchiveStatusIcon = ({
  status,
  url,
  id,
}: {
  id: string;
  status: ArchiveStatus;
  url: string | null;
}) => {
  if (status === 'available') {
    return <ArchiveDownloadButton id={id} url={url ?? undefined} />;
  }
  if (status === 'pending') {
    return <ArchivingLoadingIcon />;
  }
  return <ArchiveErrorIcon />;
};

type ArchiveListProps = {
  archives: Archive[] | 'error';
};

const ArchiveList = ({ archives }: ArchiveListProps) => {
  if (archives === 'error') {
    return (
      <>
        <WarningOutlinedIcon color="warning" />
        <h3 className="text-large text-slate-500">
          There was an error loading recordings for this meeting
        </h3>
      </>
    );
  }
  if (!archives.length) {
    return <h3 className="text-large text-slate-500">There are no recordings for this meeting</h3>;
  }
  return (
    <div className="md:max-h-[480px] md:overflow-y-auto ">
      <List sx={{ overflowX: 'auto' }}>
        {archives.map((archive, index) => {
          return (
            <ListItem
              data-testid={`archive-list-item-${archive.id}`}
              key={archive.id}
              secondaryAction={
                <ArchiveStatusIcon id={archive.id} url={archive.url} status={archive.status} />
              }
            >
              <ListItemText
                primary={`Recording ${archives.length - index}`}
                secondary={`Started at: ${archive.createdAtFormatted}`}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default ArchiveList;
