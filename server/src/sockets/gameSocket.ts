import { Server, Socket } from 'socket.io';
import { gameRoomService } from '../services/gameRoomService';

export const setupGameSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('Client connected:', socket.id);

    // Create a new game room
    socket.on('createRoom', () => {
      const { roomCode, playerId } = gameRoomService.createRoom();
      socket.join(roomCode);
      socket.emit('roomCreated', { roomCode, playerId });
    });

    // Join an existing game room
    socket.on('joinRoom', (roomCode: string) => {
      const response = gameRoomService.joinRoom(roomCode, socket.id);
      
      if (response.success) {
        socket.join(roomCode);
        socket.emit('roomJoined', { playerId: response.playerId });
        
        // Notify all players in the room about the new player
        const room = gameRoomService.getRoom(roomCode);
        if (room) {
          io.to(roomCode).emit('playersUpdated', { players: room.players });
        }
      } else {
        socket.emit('joinError', { message: response.message });
      }
    });

    // Player is ready to start the game
    socket.on('playerReady', (roomCode: string, playerId: string) => {
      const room = gameRoomService.getRoom(roomCode);
      if (room) {
        const player = room.players.find(p => p.id === playerId);
        if (player) {
          player.isReady = true;
          
          // Check if all players are ready
          const allReady = room.players.every(p => p.isReady);
          if (allReady && room.players.length === 2) {
            room.status = 'playing';
            io.to(roomCode).emit('gameStarted');
          }
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}; 