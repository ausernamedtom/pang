import { Server } from 'socket.io';
import { GameService } from '../services/game';
import { PhysicsService } from '../services/physics';

export function setupGameSocket(io: Server): void {
    const physicsService = new PhysicsService();
    const gameService = new GameService(physicsService);

    io.on('connection', (socket) => {
        // Handle player connection
        const playerId = socket.id;
        const side = gameService.addPlayer(playerId);

        // Send initial game state
        socket.emit('game_state', gameService.getSerializedState());

        // Handle player movement
        socket.on('move_paddle', (data: { direction: 'up' | 'down' }) => {
            gameService.movePaddle(side, data.direction);
        });

        // Handle game start
        socket.on('start_game', () => {
            gameService.serveBall();
        });

        // Handle game reset
        socket.on('reset_game', () => {
            gameService.reset();
            gameService.initialize();
        });

        // Handle player disconnection
        socket.on('disconnect', () => {
            gameService.removePlayer(playerId);
        });
    });
} 