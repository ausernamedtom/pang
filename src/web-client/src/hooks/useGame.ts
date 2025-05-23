import { useEffect, useRef, useState } from 'react';
import { GameState } from '../types/game';
import { WebSocketService } from '../services/websocket';

const initialState: GameState = {
  ball: { x: 400, y: 300 },
  paddles: {
    left: { x: 350, y: 560 },
    right: { x: 350, y: 20 }
  },
  score: { left: 0, right: 0 }
};

export function useGame(isHost: boolean) {
  const [ws, setWs] = useState<WebSocketService | null>(null);
  const [playerSide, setPlayerSide] = useState<'left' | 'right' | null>(null);
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [isWaiting, setIsWaiting] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wsService = new WebSocketService('ws://localhost:3001');
    setWs(wsService);

    wsService
      .connect()
      .then(() => {
        wsService.on<{ side: 'left' | 'right' | null }>('player_assigned', (data) => {
          setPlayerSide(data.side);
          if (data.side) {
            setNotificationMessage(`You are playing on the ${data.side} side`);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 3000);
          }
        });

        wsService.on<GameState>('game_state', (state) => {
          setGameState(state);
          setIsWaiting(false);
        });

        wsService.on<{ message: string }>('error', (data) => {
          setNotificationMessage(data.message);
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        });
      })
      .catch((error) => {
        console.error('Failed to connect:', error);
        setNotificationMessage('Failed to connect to game server');
        setShowNotification(true);
      });

    return () => {
      wsService.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!ws || !playerSide || isWaiting) return;

      switch (e.key) {
        case 'ArrowUp':
          ws.send({
            type: 'paddle_move',
            data: { side: playerSide, direction: 'up' }
          });
          break;
        case 'ArrowDown':
          ws.send({
            type: 'paddle_move',
            data: { side: playerSide, direction: 'down' }
          });
          break;
        case ' ':
          if (isHost) {
            ws.send({ type: 'start_game' });
          }
          break;
        case 'r':
          if (isHost) {
            ws.send({ type: 'reset_game' });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [ws, playerSide, isHost, isWaiting]);

  return {
    gameState,
    isWaiting,
    showNotification,
    notificationMessage,
    gameContainerRef
  };
}
