import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #4a90e2;
`;

const Button = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 1rem 2rem;
  margin: 0.5rem;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #357abd;
    transform: scale(1.05);
  }
`;

const Input = styled.input`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  border-radius: 5px;
  border: 2px solid #4a90e2;
  font-size: 1.2rem;
  background-color: #2a2a2a;
  color: white;

  &:focus {
    outline: none;
    border-color: #357abd;
  }
`;

const JoinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const MainMenu: React.FC = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState('');
  const [showJoinInput, setShowJoinInput] = useState(false);

  const handleCreateGame = () => {
    navigate('/game/create');
  };

  const handleJoinGame = () => {
    if (showJoinInput && roomCode) {
      navigate(`/game/join/${roomCode}`);
    } else {
      setShowJoinInput(true);
    }
  };

  return (
    <MenuContainer>
      <Title>Pang Game</Title>
      <Button onClick={handleCreateGame}>Create Game</Button>
      {showJoinInput ? (
        <JoinContainer>
          <Input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <Button onClick={handleJoinGame}>Join Game</Button>
        </JoinContainer>
      ) : (
        <Button onClick={handleJoinGame}>Join Game</Button>
      )}
    </MenuContainer>
  );
};

export default MainMenu; 