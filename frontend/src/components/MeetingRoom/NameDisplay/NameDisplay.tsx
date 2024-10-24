import { ReactElement } from 'react';
import { TEXT_SHADOW } from '../../../utils/constants';

type NameDisplayProps = {
  containerWidth: number;
  name: string;
};

/**
 * NameDisplay Component
 *
 * This component shows a truncated name within a specified container width.
 * @param {NameDisplayProps} props - the props for the component.
 * @param {number} props.containerWidth - the width of the container to determine the max width for truncation.
 * @param {string} props.name - the name to be displayed.
 * @returns {ReactElement} The NameDisplay component.
 */
const NameDisplay = ({ name, containerWidth }: NameDisplayProps): ReactElement => {
  return (
    <div
      className={`absolute text-sm truncate text-white bottom-[10px] left-[10px] ${TEXT_SHADOW}`}
      style={{
        maxWidth: containerWidth - 32,
      }}
    >
      <span>{name}</span>
    </div>
  );
};

export default NameDisplay;
