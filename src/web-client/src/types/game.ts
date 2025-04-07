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

export interface GameProps {
  roomCode: string;
  isHost: boolean;
}

export type PaddleDirection = 'up' | 'down';
export type PlayerSide = 'left' | 'right'; 