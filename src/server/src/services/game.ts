import { PhysicsService } from './physics';
import { GameState, PlayerSide } from '../types/game';

export class GameService {
    private state: GameState;
    private players: Map<string, PlayerSide> = new Map();
    private physicsService: PhysicsService;

    constructor(physicsService: PhysicsService) {
        this.physicsService = physicsService;
        this.state = {
            ball: { x: 400, y: 300 },
            paddles: {
                left: { x: 350, y: 560 },
                right: { x: 350, y: 20 }
            },
            score: { left: 0, right: 0 }
        };
    }

    addPlayer(playerId: string): PlayerSide {
        // Assign player to left side if it's available, otherwise right
        const leftPlayer = Array.from(this.players.values()).find(side => side === 'left');
        const side: PlayerSide = !leftPlayer ? 'left' : 'right';
        this.players.set(playerId, side);
        return side;
    }

    removePlayer(playerId: string): void {
        this.players.delete(playerId);
    }

    movePaddle(side: PlayerSide, direction: 'up' | 'down'): void {
        const paddle = this.state.paddles[side];
        const newY = direction === 'up' ? paddle.y - 10 : paddle.y + 10;
        
        // Keep paddle within bounds
        if (newY >= 0 && newY <= 600) {
            paddle.y = newY;
        }
    }

    serveBall(): void {
        // Reset ball position and serve in a random direction
        this.state.ball = { x: 400, y: 300 };
        this.physicsService.serveBall();
    }

    reset(): void {
        this.state = {
            ball: { x: 400, y: 300 },
            paddles: {
                left: { x: 350, y: 560 },
                right: { x: 350, y: 20 }
            },
            score: { left: 0, right: 0 }
        };
        this.physicsService.reset();
    }

    initialize(): void {
        this.physicsService.initialize();
    }

    getSerializedState(): GameState {
        return { ...this.state };
    }
} 