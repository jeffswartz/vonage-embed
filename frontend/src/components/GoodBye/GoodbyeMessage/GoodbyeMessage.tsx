import { useNavigate } from 'react-router-dom';
import GoToLandingPageButton from '../GoToLandingPageButton';
import ReenterRoomButton from '../ReenterRoomButton';

type GoodByeMessageProps = {
  header: string;
  message: string;
  roomName: string;
};

const GoodByeMessage = ({ header, message, roomName }: GoodByeMessageProps) => {
  const navigate = useNavigate();
  const handleLanding = () => {
    navigate('/');
  };

  const handleReenter = () => {
    navigate(`/waiting-room/${roomName}`);
  };
  return (
    <div className="ps-12 py-4 h-auto shrink w-[400px] text-left">
      <h2 className="text-5xl text-black pb-5 w-9/12">{header}</h2>
      <h3 className="text-large text-slate-500">{message}</h3>
      <div className="flex flex-row mt-6 items-center">
        <ReenterRoomButton handleReenter={handleReenter} roomName={roomName} />

        <GoToLandingPageButton handleLanding={handleLanding} />
      </div>
    </div>
  );
};

export default GoodByeMessage;
