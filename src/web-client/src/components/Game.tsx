import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { io, Socket } from 'socket.io-client';
import { GameProps, GameState } from '../types/game';

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
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    ball: { x: 400, y: 300 },
    paddles: {
      player1: { x: 350, y: 560 },
      player2: { x: 350, y: 20 }
    },
    score: { player1: 0, player2: 0 }
  });
  const [isWaiting, setIsWaiting] = useState(isHost);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const gameContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('joinRoom', { roomCode });

    newSocket.on('gameState', (state: GameState) => {
      setGameState(state);
      setIsWaiting(false);
    });

    newSocket.on('playerJoined', () => {
      setIsWaiting(false);
      setNotificationMessage('Player joined the game!');
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomCode]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gameContainerRef.current || !socket || isWaiting) return;

      const rect = gameContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const paddleX = Math.max(0, Math.min(700, x));

      socket.emit('paddleMove', { x: paddleX });
    };

    const container = gameContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [socket, isWaiting]);

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
  };

  return (
    <GameContainer>
      <Score>
        {gameState.score.player1} - {gameState.score.player2}
      </Score>
      <GameCanvas ref={gameContainerRef}>
        <Notification show={showNotification}>
          {notificationMessage}
        </Notification>
        {isHost && (
          <RoomCodeContainer>
            <RoomCode>Room Code: {roomCode}</RoomCode>
            <CopyButton onClick={copyRoomCode}>Copy</CopyButton>
          </RoomCodeContainer>
        )}
        {isWaiting && (
          <WaitingMessage>
            <h2>Waiting for opponent...</h2>
            <p>Share the room code to invite a friend</p>
          </WaitingMessage>
        )}
        <OpponentPaddle 
          position={gameState.paddles[isHost ? 'player2' : 'player1'].x} 
        />
        <Ball 
          x={gameState.ball.x} 
          y={gameState.ball.y} 
        />
        <Paddle 
          position={gameState.paddles[isHost ? 'player1' : 'player2'].x} 
        />
      </GameCanvas>
    </GameContainer>
  );
};

export default Game; 