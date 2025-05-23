import styled, { keyframes } from 'styled-components';

export const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

export const GameCanvas = styled.div`
  position: relative;
  width: 800px;
  height: 600px;
  background-color: #2a2a2a;
  border: 2px solid #4a90e2;
  border-radius: 10px;
  overflow: hidden;
`;

export const Paddle = styled.div<{ position: number }>`
  position: absolute;
  width: 100px;
  height: 20px;
  background-color: white;
  left: ${(props) => props.position}px;
  bottom: 20px;
  border-radius: 5px;
`;

export const OpponentPaddle = styled(Paddle)`
  bottom: auto;
  top: 20px;
`;

export const Ball = styled.div<{ x: number; y: number }>`
  position: absolute;
  width: 15px;
  height: 15px;
  background-color: white;
  border-radius: 50%;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

export const Score = styled.div`
  font-size: 2rem;
  margin: 1rem;
`;

export const RoomCodeContainer = styled.div`
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

export const RoomCode = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const CopyButton = styled.button`
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

export const WaitingMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const NotificationWrapper = styled.div`
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
