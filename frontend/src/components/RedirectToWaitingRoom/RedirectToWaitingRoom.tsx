import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useRoomName from '../../hooks/useRoomName';

type Props = {
  children: ReactElement;
};

const RedirectToWaitingRoom = ({ children }: Props): ReactElement => {
  const location = useLocation();
  const roomName = useRoomName();
  const hasAccess = !!location.state?.hasAccess;

  const searchParams = new URLSearchParams(location.search);
  const bypass = searchParams.get('bypass');
  const canEnter = !hasAccess && bypass !== 'true';
  return canEnter ? (
    <Navigate
      to={{
        pathname: `/waiting-room/${roomName}`,
      }}
    />
  ) : (
    children
  );
};

export default RedirectToWaitingRoom;
