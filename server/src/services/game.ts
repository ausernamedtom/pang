import { BallMovementService } from './ballMovement';
import { PhysicsService } from './physics';
import { WORLD } from '../config/physics';
import * as Matter from 'matter-js';

export interface GameState {
    ball: {
        position: Matter.Vector;
        velocity: Matter.Vector;
        spin: { x: number; y: number };
    } | null;
    paddles: {
        left: Matter.Body | null;
        right: Matter.Body | null;
    };
    score: {
        left: number;
        right: number;
    };
}

export interface SerializedGameState {
    ball: {
        position: { x: number; y: number };
        velocity: { x: number; y: number };
        spin: { x: number; y: number };
    } | null;
    paddles: {
        left: {
            position: { x: number; y: number };
            velocity: { x: number; y: number };
        } | null;
        right: {
            position: { x: number; y: number };
            velocity: { x: number; y: number };
        } | null;
    };
    score: {
        left: number;
        right: number;
    };
}

export class GameService {
    private physicsService: PhysicsService;
    private ballMovementService: BallMovementService;
    private leftPaddle: Matter.Body | null = null;
    private rightPaddle: Matter.Body | null = null;
    private score = { left: 0, right: 0 };

    constructor(physicsService: PhysicsService) {
        this.physicsService = physicsService;
        this.ballMovementService = new BallMovementService(physicsService);
    }

    public initialize(): void {
        // Create paddles
        this.leftPaddle = this.physicsService.createPaddle(
            WORLD.PADDLE_OFFSET,
            WORLD.HEIGHT / 2
        );
        this.rightPaddle = this.physicsService.createPaddle(
            WORLD.WIDTH - WORLD.PADDLE_OFFSET,
            WORLD.HEIGHT / 2
        );

        // Spawn ball at center
        this.ballMovementService.spawnBall({
            x: WORLD.WIDTH / 2,
            y: WORLD.HEIGHT / 2
        });
    }

    public update(deltaTime: number): void {
        this.physicsService.update(deltaTime);
        this.checkBallOutOfBounds();
    }

    public getState(): GameState {
        const ballState = this.ballMovementService.getBallState();
        return {
            ball: ballState,
            paddles: {
                left: this.leftPaddle,
                right: this.rightPaddle
            },
            score: { ...this.score }
        };
    }

    public getSerializedState(): SerializedGameState {
        const state = this.getState();
        return {
            ball: state.ball ? {
                position: { x: state.ball.position.x, y: state.ball.position.y },
                velocity: { x: state.ball.velocity.x, y: state.ball.velocity.y },
                spin: { x: state.ball.spin.x, y: state.ball.spin.y }
            } : null,
            paddles: {
                left: state.paddles.left ? {
                    position: { 
                        x: state.paddles.left.position.x,
                        y: state.paddles.left.position.y
                    },
                    velocity: {
                        x: state.paddles.left.velocity.x,
                        y: state.paddles.left.velocity.y
                    }
                } : null,
                right: state.paddles.right ? {
                    position: {
                        x: state.paddles.right.position.x,
                        y: state.paddles.right.position.y
                    },
                    velocity: {
                        x: state.paddles.right.velocity.x,
                        y: state.paddles.right.velocity.y
                    }
                } : null
            },
            score: { ...state.score }
        };
    }

    public movePaddle(side: 'left' | 'right', direction: 'up' | 'down'): void {
        const paddle = side === 'left' ? this.leftPaddle : this.rightPaddle;
        if (!paddle) return;

        const speed = 5;
        const force = direction === 'up' ? -speed : speed;
        
        Matter.Body.setVelocity(paddle, { x: 0, y: force });
    }

    public serveBall(): void {
        // Serve ball with random direction
        const angle = Math.random() * Math.PI / 2 - Math.PI / 4; // -45 to 45 degrees
        const speed = 5;
        const velocity = {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        };
        
        this.ballMovementService.serve(velocity);
    }

    private checkBallOutOfBounds(): void {
        if (this.ballMovementService.isOutOfBounds()) {
            const ballState = this.ballMovementService.getBallState();
            if (!ballState) return;

            // Check which side the ball went out on
            if (ballState.position.x < WORLD.WIDTH / 2) {
                this.score.right++;
            } else {
                this.score.left++;
            }

            // Reset ball to center
            this.ballMovementService.reset();
            this.ballMovementService.spawnBall({
                x: WORLD.WIDTH / 2,
                y: WORLD.HEIGHT / 2
            });
        }
    }

    public reset(): void {
        this.ballMovementService.reset();
        if (this.leftPaddle) {
            this.physicsService.removeBody('leftPaddle');
            this.leftPaddle = null;
        }
        if (this.rightPaddle) {
            this.physicsService.removeBody('rightPaddle');
            this.rightPaddle = null;
        }
        this.score = { left: 0, right: 0 };
    }
} 