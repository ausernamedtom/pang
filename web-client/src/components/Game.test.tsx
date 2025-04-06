import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Game from './Game';
import { io, Socket } from 'socket.io-client';

// Mock clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
  },
  writable: true,
});

const mockRoomCode = 'ABC123';

// Mock socket.io-client
vi.mock('socket.io-client', () => ({
  io: vi.fn(() => ({
    emit: vi.fn(),
    on: vi.fn(),
    disconnect: vi.fn(),
  })),
}));

const mockSocket = {
  emit: vi.fn(),
  on: vi.fn(),
  disconnect: vi.fn(),
};

// Set up the mock socket
(io as ReturnType<typeof vi.fn>).mockReturnValue(mockSocket);

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Game Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the mock socket
    mockSocket.emit.mockClear();
    mockSocket.on.mockClear();
    mockSocket.disconnect.mockClear();
  });

  it('shows room code and copy button for host', () => {
    renderWithRouter(<Game roomCode={mockRoomCode} isHost={true} />);
    expect(screen.getByText('Room Code: ABC123')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
  });

  it('does not show room code for non-host', () => {
    renderWithRouter(<Game roomCode={mockRoomCode} isHost={false} />);
    expect(screen.queryByText('Room Code: ABC123')).not.toBeInTheDocument();
  });

  it('copies room code to clipboard when copy button is clicked', () => {
    renderWithRouter(<Game roomCode={mockRoomCode} isHost={true} />);
    
    // Click the copy button
    fireEvent.click(screen.getByText('Copy'));
    
    // Check if clipboard API was called with the correct room code
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockRoomCode);
  });

  it('shows waiting message for host', () => {
    renderWithRouter(<Game roomCode={mockRoomCode} isHost={true} />);
    expect(screen.getByText('Waiting for opponent...')).toBeInTheDocument();
    expect(screen.getByText('Share the room code to invite a friend')).toBeInTheDocument();
  });

  it('shows notification when player joins', async () => {
    renderWithRouter(<Game roomCode={mockRoomCode} isHost={true} />);
    
    // Simulate player joining
    const mockCalls = (mockSocket.on as ReturnType<typeof vi.fn>).mock.calls;
    const playerJoinedCallback = mockCalls.find((call) => call[0] === 'playerJoined')?.[1];

    await act(async () => {
      playerJoinedCallback();
    });

    expect(screen.getByText('Player joined the game!')).toBeInTheDocument();
  });

  it('removes notification after 3 seconds', async () => {
    vi.useFakeTimers();
    renderWithRouter(<Game roomCode={mockRoomCode} isHost={true} />);
    
    // Simulate player joining
    const mockCalls = (mockSocket.on as ReturnType<typeof vi.fn>).mock.calls;
    const playerJoinedCallback = mockCalls.find((call) => call[0] === 'playerJoined')?.[1];

    await act(async () => {
      playerJoinedCallback();
    });

    expect(screen.getByText('Player joined the game!')).toBeInTheDocument();

    // Advance timers by 3 seconds (notification timeout)
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });

    // The notification should be gone after the timeout
    expect(screen.queryByText('Player joined the game!')).not.toBeInTheDocument();
    vi.useRealTimers();
  });

  it('removes waiting message when player joins', async () => {
    renderWithRouter(<Game roomCode={mockRoomCode} isHost={true} />);
    
    // Simulate player joining
    const mockCalls = (mockSocket.on as ReturnType<typeof vi.fn>).mock.calls;
    const playerJoinedCallback = mockCalls.find((call) => call[0] === 'playerJoined')?.[1];

    await act(async () => {
      playerJoinedCallback();
    });

    expect(screen.queryByText('Waiting for opponent...')).not.toBeInTheDocument();
  });

  it('connects to socket server on mount', () => {
    renderWithRouter(<Game roomCode={mockRoomCode} isHost={true} />);
    expect(io).toHaveBeenCalledWith('http://localhost:3001');
  });

  it('disconnects from socket when component unmounts', () => {
    const { unmount } = renderWithRouter(<Game roomCode={mockRoomCode} isHost={true} />);
    unmount();
    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
}); 