import { GameRoom, Player, CreateRoomResponse, JoinRoomResponse } from '../types/game';
import * as crypto from 'crypto';

class GameRoomService {
  private rooms: Map<string, GameRoom> = new Map();

  createRoom(): CreateRoomResponse {
    const roomCode = this.generateRoomCode();
    const roomId = crypto.randomUUID();
    const playerId = crypto.randomUUID();

    const room: GameRoom = {
      id: roomId,
      code: roomCode,
      players: [],
      status: 'waiting'
    };

    this.rooms.set(roomCode, room);
    return { roomCode, playerId };
  }

  joinRoom(roomCode: string, socketId: string): JoinRoomResponse {
    const room = this.rooms.get(roomCode);
    
    if (!room) {
      return { success: false, message: 'Room not found' };
    }

    if (room.players.length >= 2) {
      return { success: false, message: 'Room is full' };
    }

    const playerId = crypto.randomUUID();
    const player: Player = {
      id: playerId,
      socketId,
      isReady: false
    };

    room.players.push(player);
    return { success: true, playerId };
  }

  private generateRoomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }

  getRoom(roomCode: string): GameRoom | undefined {
    return this.rooms.get(roomCode);
  }
}

export const gameRoomService = new GameRoomService(); 