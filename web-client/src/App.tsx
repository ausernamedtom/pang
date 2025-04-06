import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainMenu from './components/MainMenu';
import Game from './components/Game';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route 
          path="/game/create" 
          element={<Game roomCode={Math.random().toString(36).substring(2, 8)} isHost={true} />} 
        />
        <Route 
          path="/game/join/:roomCode" 
          element={<Game roomCode={window.location.pathname.split('/').pop() || ''} isHost={false} />} 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
