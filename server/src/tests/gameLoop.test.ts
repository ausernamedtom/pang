import { GameLoopService } from '../services/gameLoop';
import { GameService } from '../services/game';
import { PhysicsService } from '../services/physics';
import { ENGINE } from '../config/physics';

describe('GameLoopService', () => {
    let gameService: GameService;
    let physicsService: PhysicsService;
    let gameLoopService: GameLoopService;
    let updateCallback: jest.Mock;

    beforeEach(() => {
        physicsService = new PhysicsService();
        gameService = new GameService(physicsService);
        gameLoopService = new GameLoopService(gameService, physicsService);
        updateCallback = jest.fn();
        gameLoopService.setUpdateCallback(updateCallback);
    });

    afterEach(() => {
        gameLoopService.stop();
    });

    it('should start and stop the game loop', () => {
        gameLoopService.start();
        expect(gameLoopService['isRunning']).toBe(true);
        
        gameLoopService.stop();
        expect(gameLoopService['isRunning']).toBe(false);
    });

    it('should call update callback with game state', (done) => {
        gameService.initialize();
        gameLoopService.start();
        
        setTimeout(() => {
            try {
                expect(updateCallback).toHaveBeenCalled();
                const state = updateCallback.mock.calls[0][0];
                expect(state).toHaveProperty('ball');
                expect(state).toHaveProperty('paddles');
                expect(state).toHaveProperty('score');
                done();
            } catch (error) {
                done(error);
            } finally {
                gameLoopService.stop();
            }
        }, 100);
    });

    it('should update physics with fixed time step', (done) => {
        gameService.initialize();
        gameLoopService.start();
        
        setTimeout(() => {
            try {
                const state = updateCallback.mock.calls[0][0];
                const initialBallPosition = { ...state.ball.position };
                
                setTimeout(() => {
                    try {
                        const newState = updateCallback.mock.calls[1][0];
                        expect(newState.ball.position).not.toEqual(initialBallPosition);
                        done();
                    } catch (error) {
                        done(error);
                    } finally {
                        gameLoopService.stop();
                    }
                }, ENGINE.TIME_STEP * 1000);
            } catch (error) {
                done(error);
                gameLoopService.stop();
            }
        }, 100);
    });
}); 