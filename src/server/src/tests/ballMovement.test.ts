import { BallMovementService } from '../services/ballMovement';
import { PhysicsService } from '../services/physics';
import { WORLD, BALL } from '../config/physics';
import * as Matter from 'matter-js';

describe('BallMovementService', () => {
    let physicsService: PhysicsService;
    let ballMovementService: BallMovementService;

    beforeEach(() => {
        physicsService = new PhysicsService();
        ballMovementService = new BallMovementService(physicsService);
    });

    it('should spawn a ball at the specified position', () => {
        const position = { x: 1, y: 1 };
        const ball = ballMovementService.spawnBall(position);

        expect(ball.position.x).toBe(position.x);
        expect(ball.position.y).toBe(position.y);
        expect(ball.circleRadius).toBe(BALL.RADIUS);
    });

    it('should serve the ball with specified velocity', () => {
        const position = { x: 1, y: 1 };
        const velocity = { x: 2, y: -3 };
        
        ballMovementService.spawnBall(position);
        ballMovementService.serve(velocity);
        
        const state = ballMovementService.getBallState();
        expect(state?.velocity.x).toBe(velocity.x);
        expect(state?.velocity.y).toBe(velocity.y);
    });

    it('should throw error when serving without a ball', () => {
        expect(() => {
            ballMovementService.serve({ x: 1, y: 1 });
        }).toThrow('No ball to serve');
    });

    it('should apply spin to the ball', () => {
        const ball = ballMovementService.spawnBall({ x: 1, y: 1 });
        Matter.Body.setVelocity(ball, { x: 1, y: 1 });
        const initialVelocity = { ...ball.velocity };

        ballMovementService.applySpin({ x: 0.5, y: 0.5 });
        const state = ballMovementService.getBallState();

        expect(state?.velocity.x).not.toBe(initialVelocity.x);
        expect(state?.velocity.y).not.toBe(initialVelocity.y);
    });

    it('should detect when ball is out of bounds', () => {
        // Test in-bounds
        const ball = ballMovementService.spawnBall({ x: WORLD.WIDTH / 2, y: WORLD.HEIGHT / 2 });
        expect(ballMovementService.isOutOfBounds()).toBe(false);

        // Test out of bounds
        Matter.Body.setPosition(ball, { x: -1, y: -1 });
        expect(ballMovementService.isOutOfBounds()).toBe(true);
    });

    it('should reset ball state', () => {
        ballMovementService.spawnBall({ x: 1, y: 1 });
        ballMovementService.reset();
        
        const state = ballMovementService.getBallState();
        expect(state).toBeNull();
    });

    it('should apply force to the ball', () => {
        const ball = ballMovementService.spawnBall({ x: 1, y: 1 });
        const initialVelocity = { ...ball.velocity };

        ballMovementService.applyForce({ x: 0.1, y: 0.1 });
        physicsService.update(1/60); // Update physics to see the effect of the force
        const state = ballMovementService.getBallState();

        expect(state?.velocity.x).not.toBe(initialVelocity.x);
        expect(state?.velocity.y).not.toBe(initialVelocity.y);
    });
}); 