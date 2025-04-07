export interface Position {
  x: number;
  y: number;
}

export interface Paddles {
  player1: Position;
  player2: Position;
}

export interface Score {
  player1: number;
  player2: number;
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