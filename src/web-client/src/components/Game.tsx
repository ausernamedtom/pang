import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { GameProps, GameState } from '../types/game';
import { WebSocketService } from '../services/websocket';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

const GameCanvas = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  background-color: #2a2a2a;
  border: 2px solid #4a90e2;
  border-radius: 10px;
  overflow: hidden;
`;

const Paddle = styled.div<{ position: number }>`
  position: absolute;
  width: 100px;
  height: 20px;
  background-color: white;
  left: ${props => props.position}px;
  bottom: 20px;
  border-radius: 5px;
`;

const OpponentPaddle = styled(Paddle)`
  bottom: auto;
  top: 20px;
`;

const Ball = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
`;

const Score = styled.div`
  font-size: 2rem;
  margin: 1rem;
`;

const RoomCodeContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RoomCode = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CopyButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #357abd;
  }
`;

const WaitingMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const NotificationWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem 2rem;
  border-radius: 5px;
  animation: ${fadeIn} 0.3s ease-in-out;
  animation-fill-mode: forwards;
  z-index: 1000;
`;

const Notification: React.FC<{ show: boolean; children: React.ReactNode }> = ({ show, children }) => {
  if (!show) return null;
  return <NotificationWrapper>{children}</NotificationWrapper>;
};

const Game: React.FC<GameProps> = ({ roomCode, isHost }) => {
  const navigate = useNavigate();
  const [ws, setWs] = useState<WebSocketService | null>(null);
  const [playerSide, setPlayerSide] = useState<'left' | 'right' | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    ball: { x: 400, y: 300 },
    paddles: {
      left: { x: 350, y: 560 },
      right: { x: 350, y: 20 }
    },
    score: { left: 0, right: 0 }
  });
  const [isWaiting, setIsWaiting] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wsService = new WebSocketService('ws://localhost:3001');
    setWs(wsService);

    wsService.connect().then(() => {
      // Set up event handlers
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
    }).catch((error) => {
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

  return (
    <GameContainer ref={gameContainerRef}>
      <GameCanvas>
        <Ball x={gameState.ball.x} y={gameState.ball.y} />
        <Paddle position={gameState.paddles.left.x} />
        <OpponentPaddle position={gameState.paddles.right.x} />
        
        {isWaiting && (
          <WaitingMessage>
            Waiting for opponent...
            {isHost && <div>Share the room code to start playing!</div>}
          </WaitingMessage>
        )}

        <RoomCodeContainer>
          <RoomCode>Room: {roomCode}</RoomCode>
          <CopyButton onClick={() => navigator.clipboard.writeText(roomCode)}>
            Copy Code
          </CopyButton>
        </RoomCodeContainer>
      </GameCanvas>

      <Score>
        {gameState.score.left} - {gameState.score.right}
      </Score>

      <Notification show={showNotification}>
        {notificationMessage}
      </Notification>
    </GameContainer>
  );
};

export default Game; 