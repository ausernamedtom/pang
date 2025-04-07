import { GameService } from '../services/game';
import { PhysicsService } from '../services/physics';
import { WORLD } from '../config/physics';
import * as Matter from 'matter-js';

describe('GameService', () => {
    let physicsService: PhysicsService;
    let gameService: GameService;

    beforeEach(() => {
        physicsService = new PhysicsService();
        gameService = new GameService(physicsService);
    });

    it('should initialize game with paddles and ball', () => {
        gameService.initialize();
        const state = gameService.getState();

        expect(state.paddles.left).not.toBeNull();
        expect(state.paddles.right).not.toBeNull();
        expect(state.ball).not.toBeNull();
        expect(state.score).toEqual({ left: 0, right: 0 });
    });

    it('should move paddles up and down', () => {
        gameService.initialize();
        
        // Move left paddle up
        gameService.movePaddle('left', 'up');
        const leftPaddle = gameService.getState().paddles.left;
        expect(leftPaddle?.velocity.y).toBeLessThan(0);

        // Move right paddle down
        gameService.movePaddle('right', 'down');
        const rightPaddle = gameService.getState().paddles.right;
        expect(rightPaddle?.velocity.y).toBeGreaterThan(0);
    });

    it('should serve ball with random direction', () => {
        gameService.initialize();
        gameService.serveBall();
        
        const state = gameService.getState();
        expect(state.ball?.velocity.x).not.toBe(0);
        expect(state.ball?.velocity.y).not.toBe(0);
    });

    it('should update score when ball goes out of bounds', () => {
        gameService.initialize();
        const ballBody = physicsService.getBodies().find(body => body.label === 'ball');
        if (!ballBody) return;

        // Move ball out of bounds on left side
        Matter.Body.setPosition(ballBody, { x: -1, y: WORLD.HEIGHT / 2 });
        gameService.update(1/60);

        const state = gameService.getState();
        expect(state.score.right).toBe(1);
        expect(state.ball?.position.x).toBe(WORLD.WIDTH / 2);
    });

    it('should reset game state', () => {
        gameService.initialize();
        gameService.serveBall();
        gameService.movePaddle('left', 'up');
        
        gameService.reset();
        const state = gameService.getState();
        
        expect(state.ball).toBeNull();
        expect(state.paddles.left).toBeNull();
        expect(state.paddles.right).toBeNull();
        expect(state.score).toEqual({ left: 0, right: 0 });
    });
}); 