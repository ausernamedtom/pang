import React from 'react';
import { GameProps } from '../types/game';
import Notification from './Notification';
import {
  GameContainer,
  GameCanvas,
  Paddle,
  OpponentPaddle,
  Ball,
  Score,
  RoomCodeContainer,
  RoomCode,
  CopyButton,
  WaitingMessage
} from './GameStyles';
import { useGame } from '../hooks/useGame';

const Game: React.FC<GameProps> = ({ roomCode, isHost }) => {
  const {
    gameState,
    isWaiting,
    showNotification,
    notificationMessage,
    gameContainerRef
  } = useGame(isHost);

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

      <Notification show={showNotification}>{notificationMessage}</Notification>
    </GameContainer>
  );
};

export default Game;
