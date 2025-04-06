import { Server, Socket } from 'socket.io';
import { gameRoomService } from '../services/gameRoomService';

export const setupGameSocket = (io: Server) => {
  io.on('connection', (socket: Socket) => {
    console.log('🔌 Client connected:', socket.id);

    // Create a new game room
    socket.on('createRoom', () => {
      const { roomCode, playerId } = gameRoomService.createRoom();
      socket.join(roomCode);
      socket.emit('roomCreated', { roomCode, playerId });
      console.log(`🎮 Room created: ${roomCode} by player ${socket.id}`);
    });

    // Join an existing game room
    socket.on('joinRoom', async ({ roomCode }) => {
      try {
        const room = await gameRoomService.joinRoom(roomCode, socket.id);
        socket.join(roomCode);
        socket.emit('roomJoined', { success: true, room });
        
        // Get the current number of players in the room
        const currentRoom = gameRoomService.getRoom(roomCode);
        const playerCount = currentRoom?.players.length || 0;
        
        console.log(`👋 Player ${socket.id} joined room ${roomCode} (Players: ${playerCount}/2)`);
        
        // Notify other players in the room that someone joined
        socket.to(roomCode).emit('playerJoined');
      } catch (error) {
        console.error(`❌ Failed to join room ${roomCode}:`, error instanceof Error ? error.message : 'Unknown error');
        socket.emit('roomJoined', { 
          success: false, 
          error: error instanceof Error ? error.message : 'Failed to join room' 
        });
      }
    });

    // Player is ready to start the game
    socket.on('playerReady', (roomCode: string, playerId: string) => {
      const room = gameRoomService.getRoom(roomCode);
      if (room) {
        const player = room.players.find(p => p.id === playerId);
        if (player) {
          player.isReady = true;
          console.log(`✅ Player ${socket.id} is ready in room ${roomCode}`);
          
          // Check if all players are ready
          const allReady = room.players.every(p => p.isReady);
          if (allReady && room.players.length === 2) {
            room.status = 'playing';
            console.log(`🎯 Game started in room ${roomCode}`);
            io.to(roomCode).emit('gameStarted');
          }
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });
}; 