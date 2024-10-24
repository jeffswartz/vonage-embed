import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
import { ReactElement, useEffect, useState } from 'react';
import generateRoomName from '../../utils/generateRoomName';
import EmbedDetails from '../EmbedDetails';
import { API_URL } from '../../utils/constants';
import { EmbedProps } from '../../../../backend/types/embed';

/**
 * RoomJoinContainer Component
 *
 * This component renders UI elements for creating a new room or joining an existing one.
 * @returns {ReactElement} The room join container component.
 */
const RoomJoinContainer = (): ReactElement => {
  const [createdEmbedId, setCreatedEmbedId] = useState<string>('');
  const [showEmbedDetails, setShowEmbedDetails] = useState<boolean>(false);
  const [roomIds, setRoomIds] = useState<string[]>([]);
  const [selectedEmbedId, setSelectedEmbedId] = useState<string>('');

  // After a room is created, the user is redirected to a waiting room
  // where they have an option to pick their devices, add their name, and join the meeting room
  const handleNewRoom = ( embedProps: EmbedProps ) => {
    const embedId = generateRoomName();
    setShowEmbedDetails(false);
    roomIds.push(embedId);
    setRoomIds(roomIds);
    setCreatedEmbedId(embedId);
    return axios.post(`${API_URL}/session/${embedId}`, { roomName: 'foo', ...embedProps });
  };

  const handleEmbedSelect = (event) => {
    if (event.target.value === 'create') {
      return setShowEmbedDetails(true);
    }
    setSelectedEmbedId(event.target.value);
  };

  useEffect(() => {
    axios.get(`${API_URL}/session/`).then((resp) => {
      setRoomIds(resp.data?.rooms);
    });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="md:pe-12 flex flex-1 flex-col flex-start justify-start items-center md:justify-center w-10/12 max-w-xl mt-6 md:mt-0">
      <div>
        <select onChange={handleEmbedSelect} defaultValue="instructions">
          <option key="embed-instructions" disabled value="instructions">
            Create or select and embed ...
          </option>
          <option key="create-embed" value="create">
            Create ...
          </option>
          {roomIds.map((value, index) => {
            return (
              <option value={value} key={index}>
                {value}
              </option>
            );
          })}
        </select>
      </div>

      {showEmbedDetails && <EmbedDetails embedId={createdEmbedId} handleNewRoom={handleNewRoom} />}

      {createdEmbedId && (
        <p className="text-left font-mono b-1">
          &lt;iframe src="{window.location.origin}/waiting-room/{createdEmbedId}" width=800
          height=640 scrolling="auto" allow="microphone; camera" &gt;&lt;/iframe&gt;
        </p>
      )}

      {selectedEmbedId && (
        <div>
          <EmbedDetails
            embedId={selectedEmbedId}
            disabled={true}
            embedProps={{ name: 'sample', url: 'https://example.com', height: '400', width: '600' }}
          />
          <p className="text-left font-mono b-1">
            &lt;iframe src="{window.location.origin}/waiting-room/{selectedEmbedId}" width=800
            height=640 scrolling="auto" allow="microphone; camera" &gt;&lt;/iframe&gt;
          </p>
        </div>
      )}
    </div>
  );
};

export default RoomJoinContainer;
