import { ReactElement } from 'react';
import { API_URL } from '../../utils/constants';
import NewRoomButton from '../NewRoomButton';
import { EmbedProps } from '../../../../backend/types/embed';

interface EmbedDetailsProps {
  embedId: string; // Or the appropriate type
  disabled?: boolean;
  embedProps?: EmbedProps;
  handleNewRoom?: (embedProps?: EmbedProps) => void;
}

const EmbedDetails = (props: EmbedDetailsProps): ReactElement => {
  const inputStyle = 'mt-1 p-2 border rounded-md w-full focus:ring-blue-500 focus:border-blue-500';
  // const inputAttributes = { disabled: props.disabled };
  const labelStyle = 'block text-sm font-medium text-gray-700 w-40 mx-4';
  const rowStyle = 'flex items-center justify-center';
  let width = props.embedProps?.width || '800';
  let height = props.embedProps?.height || '600';
  let url = props.embedProps?.url || 'https://localhost';
  return (
    <div className="h-48 w-96 bg-gray-200">
      <div className={rowStyle}>
        <label htmlFor="embed-name" className={labelStyle}>
          Name
        </label>
        <input
          {...{ disabled: props.disabled }}
          type="text"
          id="embed-name"
          className={inputStyle}
          value={props.embedProps?.name}
        />
      </div>

      <div className={rowStyle}>
        <label htmlFor="width" className={labelStyle}>
          Width
        </label>
        <input type="text" id="width" className={inputStyle} defaultValue={width}
          onChange={event => { console.log(event.target.value); width = event.target.value; }}
        />
        <label htmlFor="height" className={labelStyle}>
          Height
        </label>
        <input type="text" id="height" className={inputStyle} defaultValue={height}
          onChange={event => { console.log(event.target.value); height = event.target.value; }}
          />
      </div>

      <div className={rowStyle}>
        <label htmlFor="url" className={labelStyle}>
          URL
        </label>
        <input type="text" id="url" className={inputStyle} defaultValue={url}
          onChange={event => { console.log(event.target.value); url = event.target.value; }}
        />
      </div>

      {props.handleNewRoom && <NewRoomButton handleNewRoom={() => props.handleNewRoom && props.handleNewRoom({ width, height, url })} />}
    </div>
  );
};

export default EmbedDetails;
