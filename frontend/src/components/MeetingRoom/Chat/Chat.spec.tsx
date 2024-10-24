import { afterEach, beforeEach, describe, expect, it, Mock, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import { SessionContextType } from '../../../Context/SessionProvider/session';
import useSessionContext from '../../../hooks/useSessionContext';
import Chat from './Chat';
import { ChatMessageType } from '../../../types/chat';

vi.mock('../../../hooks/useSessionContext.tsx');
vi.mock('../../../hooks/useUserContext');
const mockUseSessionContext = useSessionContext as Mock<[], SessionContextType>;

const testMessages: ChatMessageType[] = [
  {
    participantName: 'User One',
    timestamp: 1726587657728,
    message: 'Hello all',
  },
  {
    participantName: 'User Two',
    timestamp: 1726587657729,
    message: 'Good morning',
  },
  {
    participantName: 'User Three',
    timestamp: 1726587657730,
    message: 'Hi',
  },
  {
    participantName: 'User Four',
    timestamp: 1726587657731,
    message: 'Sup',
  },
];

describe('Chat', () => {
  let sessionContext: SessionContextType;

  beforeEach(() => {
    sessionContext = {
      messages: testMessages,
    } as unknown as SessionContextType;
    mockUseSessionContext.mockReturnValue(sessionContext as unknown as SessionContextType);
  });
  afterEach(() => {
    cleanup();
  });

  it('should display messages', () => {
    render(<Chat handleClose={() => {}} isOpen />);

    const chatMessages = screen.getAllByTestId('chat-message');
    expect(chatMessages.length).toBe(4);

    expect(within(chatMessages[0]).getByTestId('chat-msg-participant-name').textContent).toEqual(
      'User One'
    );
    expect(within(chatMessages[0]).getByTestId('chat-msg-timestamp').textContent).toEqual(
      '11:40 AM'
    );
    expect(chatMessages[0].textContent).toMatch('Hello all');
  });
});
