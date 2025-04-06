import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { GameState } from '../types/game';

const { width, height } = Dimensions.get('window');
const PADDLE_WIDTH = 100;
const PADDLE_HEIGHT = 20;
const BALL_SIZE = 15;

const GameScreen = ({ route }) => {
  const { roomCode, isHost } = route.params;
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    ball: { x: width / 2, y: height / 2 },
    paddles: {
      player1: { x: width / 2 - PADDLE_WIDTH / 2, y: height - 50 },
      player2: { x: width / 2 - PADDLE_WIDTH / 2, y: 50 }
    },
    score: { player1: 0, player2: 0 }
  });

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.emit('joinRoom', { roomCode });

    newSocket.on('gameState', (state: GameState) => {
      setGameState(state);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomCode]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      if (socket) {
        const newX = Math.max(0, Math.min(width - PADDLE_WIDTH, 
          gameState.paddles[isHost ? 'player1' : 'player2'].x + gestureState.dx));
        socket.emit('paddleMove', { x: newX });
      }
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.score}>
        {gameState.score.player1} - {gameState.score.player2}
      </Text>
      
      <View style={styles.gameArea}>
        {/* Opponent's paddle */}
        <View 
          style={[
            styles.paddle, 
            styles.opponentPaddle,
            { left: gameState.paddles[isHost ? 'player2' : 'player1'].x }
          ]} 
        />
        
        {/* Ball */}
        <View 
          style={[
            styles.ball,
            { left: gameState.ball.x, top: gameState.ball.y }
          ]} 
        />
        
        {/* Player's paddle */}
        <View 
          {...panResponder.panHandlers}
          style={[
            styles.paddle,
            styles.playerPaddle,
            { left: gameState.paddles[isHost ? 'player1' : 'player2'].x }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  score: {
    color: '#fff',
    fontSize: 32,
    textAlign: 'center',
    marginTop: 50,
  },
  gameArea: {
    flex: 1,
    position: 'relative',
  },
  paddle: {
    position: 'absolute',
    width: PADDLE_WIDTH,
    height: PADDLE_HEIGHT,
    backgroundColor: '#fff',
  },
  playerPaddle: {
    bottom: 20,
  },
  opponentPaddle: {
    top: 20,
  },
  ball: {
    position: 'absolute',
    width: BALL_SIZE,
    height: BALL_SIZE,
    backgroundColor: '#fff',
    borderRadius: BALL_SIZE / 2,
  },
});

export default GameScreen; 