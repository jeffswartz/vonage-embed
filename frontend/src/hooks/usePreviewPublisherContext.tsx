import { useContext } from 'react';
import {
  PreviewPublisherContext,
  PreviewPublisherContextType,
} from '../Context/PreviewPublisherProvider';

const usePreviewPublisherContext = () => {
  const context = useContext<PreviewPublisherContextType>(PreviewPublisherContext);
  return context;
};

export default usePreviewPublisherContext;
