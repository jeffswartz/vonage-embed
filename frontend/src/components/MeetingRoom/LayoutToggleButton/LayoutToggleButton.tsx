import ViewSidebarIcon from '@mui/icons-material/ViewSidebar';
import Tooltip from '@mui/material/Tooltip';
import WindowIcon from '@mui/icons-material/Window';
import useSessionContext from '../../../hooks/useSessionContext';
import displayOnDesktop from '../../../utils/displayOnDesktop';
import ToolbarButton from '../ToolbarButton';

const LayoutToggleButton = () => {
  const { layoutMode, setLayoutMode } = useSessionContext();
  const isGrid = layoutMode === 'grid';

  const handleClick = () => {
    setLayoutMode((prev) => (prev === 'grid' ? 'active-speaker' : 'grid'));
  };

  const title = isGrid ? 'Switch to Active Speaker layout' : 'Switch to Grid layout';

  return (
    <div className={`hidden ${displayOnDesktop()}`}>
      <Tooltip title={title} aria-label="video layout">
        <ToolbarButton
          onClick={handleClick}
          icon={
            !isGrid ? (
              <ViewSidebarIcon className="text-white" />
            ) : (
              <WindowIcon className="text-white" />
            )
          }
        />
      </Tooltip>
    </div>
  );
};

export default LayoutToggleButton;
