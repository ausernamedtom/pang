import { PhysicsService } from '../services/physics';
import * as Matter from 'matter-js';

describe('PhysicsService', () => {
    let physicsService: PhysicsService;

    beforeEach(() => {
        physicsService = new PhysicsService();
    });

    it('should create a ball with correct properties', () => {
        const ball = physicsService.createBall(0, 0);
        expect(ball).toBeDefined();
        expect(ball.circleRadius).toBe(0.02); // BALL.RADIUS
        expect(ball.mass).toBe(0.0027); // BALL.MASS
    });

    it('should create a paddle with correct properties', () => {
        const paddle = physicsService.createPaddle(0, 0);
        expect(paddle).toBeDefined();
        expect(paddle.bounds.max.x - paddle.bounds.min.x).toBe(0.15); // PADDLE.WIDTH
        expect(paddle.bounds.max.y - paddle.bounds.min.y).toBe(0.25); // PADDLE.HEIGHT
    });

    it('should apply spin to a body', () => {
        const ball = physicsService.createBall(0, 0);
        Matter.Body.setVelocity(ball, { x: 1, y: 1 });
        const initialVelocity = { ...ball.velocity };
        
        physicsService.applySpin(ball, { x: 0.5, y: 0.5 });
        
        expect(ball.velocity.x).not.toBe(initialVelocity.x);
        expect(ball.velocity.y).not.toBe(initialVelocity.y);
    });

    it('should update physics world', () => {
        const ball = physicsService.createBall(0, 0);
        const initialPosition = { ...ball.position };
        
        physicsService.update(1/60); // One frame at 60 FPS
        
        expect(ball.position).not.toEqual(initialPosition);
    });
}); 