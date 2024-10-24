import { ReactNode, createContext, useMemo } from 'react';
import usePreviewPublisher from './usePreviewPublisher';

export type PreviewPublisherContextType = ReturnType<typeof usePreviewPublisher>;
export const PreviewPublisherContext = createContext({} as PreviewPublisherContextType);

/**
 * PreviewPublisherProvider - React Context Provider for PublisherContext
 * PublisherContext contains all state and methods for local video publisher
 * We use Context to make the publisher available in many components across the app without
 * prop drilling: https://react.dev/learn/passing-data-deeply-with-context#use-cases-for-context
 * See usePublisher.tsx for methods and state
 * @param {object} props - The provider properties
 * @param {ReactNode} props.children - The content to be rendered
 * @returns {PreviewPublisherContext} a context provider for a publisher preview
 */
export const PreviewPublisherProvider = ({ children }: { children: ReactNode }) => {
  const previewPublisherContext = usePreviewPublisher();
  const value = useMemo(() => previewPublisherContext, [previewPublisherContext]);
  return (
    <PreviewPublisherContext.Provider value={value}>{children}</PreviewPublisherContext.Provider>
  );
};
