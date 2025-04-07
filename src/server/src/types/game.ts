export interface Player {
  id: string;
  socketId: string;
  isReady: boolean;
}

export interface GameRoom {
  id: string;
  code: string;
  players: Player[];
  status: 'waiting' | 'playing' | 'finished';
}

export interface CreateRoomResponse {
  roomCode: string;
  playerId: string;
}

export interface JoinRoomResponse {
  success: boolean;
  message?: string;
  playerId?: string;
} 