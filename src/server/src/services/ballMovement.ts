import * as Matter from 'matter-js';
import { PhysicsService } from './physics';
import { WORLD } from '../config/physics';

interface BallState {
    position: { x: number; y: number };
    velocity: { x: number; y: number };
    spin: number;
}

export class BallMovementService {
    private physicsService: PhysicsService;
    private ball: Matter.Body | null = null;

    constructor(physicsService: PhysicsService) {
        this.physicsService = physicsService;
    }

    public spawnBall(position: { x: number, y: number }): Matter.Body {
        // Remove existing ball if any
        if (this.ball) {
            this.physicsService.removeBody('ball');
        }

        // Create new ball
        this.ball = this.physicsService.createBall(position.x, position.y);
        return this.ball;
    }

    public serve(velocity: { x: number, y: number }): void {
        if (!this.ball) {
            throw new Error('No ball to serve');
        }

        Matter.Body.setVelocity(this.ball, velocity);
    }

    public getBallState(): BallState | null {
        if (!this.ball) {
            return null;
        }

        return {
            position: { x: this.ball.position.x, y: this.ball.position.y },
            velocity: { x: this.ball.velocity.x, y: this.ball.velocity.y },
            spin: 0 // Initialize with no spin
        };
    }

    public applyForce(force: Matter.Vector): void {
        if (!this.ball) {
            throw new Error('No ball to apply force to');
        }

        Matter.Body.applyForce(this.ball, this.ball.position, force);
    }

    public applySpin(spin: { x: number, y: number }): void {
        if (!this.ball) {
            throw new Error('No ball to apply spin to');
        }

        this.physicsService.applySpin(this.ball, spin);
    }

    public isOutOfBounds(): boolean {
        if (!this.ball) {
            return true;
        }

        return (
            this.ball.position.x < 0 ||
            this.ball.position.x > WORLD.WIDTH ||
            this.ball.position.y < 0 ||
            this.ball.position.y > WORLD.HEIGHT
        );
    }

    public reset(): void {
        if (this.ball) {
            this.physicsService.removeBody('ball');
            this.ball = null;
        }
    }
} 