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

export interface Position {
    x: number;
    y: number;
}

export interface Paddles {
    left: Position;
    right: Position;
}

export interface Score {
    left: number;
    right: number;
}

export interface GameState {
    ball: Position;
    paddles: Paddles;
    score: Score;
}

export type PlayerSide = 'left' | 'right'; 