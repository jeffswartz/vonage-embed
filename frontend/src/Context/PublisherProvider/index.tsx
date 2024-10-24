import { ReactNode, createContext, useMemo } from 'react';
import usePublisher from './usePublisher';

export type PublisherContextType = ReturnType<typeof usePublisher>;
export const PublisherContext = createContext({} as PublisherContextType);

/**
 * PublisherProvider - React Context Provider for PublisherContext
 * PublisherContext contains all state and methods for local video publisher
 * We use Context to make the publisher available in many components across the app without
 * prop drilling: https://react.dev/learn/passing-data-deeply-with-context#use-cases-for-context
 * See usePublisher.tsx for methods and state
 * @param {object} props - The provider properties
 * @param {ReactNode} props.children - The content to be rendered
 * @returns {PublisherContextType} a context provider for a publisher
 */
export const PublisherProvider = ({ children }: { children: ReactNode }) => {
  const publisherContext = usePublisher();
  const value = useMemo(() => publisherContext, [publisherContext]);
  return <PublisherContext.Provider value={value}>{children}</PublisherContext.Provider>;
};
