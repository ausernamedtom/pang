import { WebSocketServer, WebSocket } from 'ws';
import { GameService } from '../services/game';
import { PhysicsService } from '../services/physics';

export function setupGameSocket(wss: WebSocketServer): void {
    const physicsService = new PhysicsService();
    const gameService = new GameService(physicsService);

    wss.on('connection', (ws: WebSocket) => {
        // Handle player connection
        const playerId = Math.random().toString(36).substring(7);
        const side = gameService.addPlayer(playerId);

        // Send initial game state
        ws.send(JSON.stringify({
            type: 'game_state',
            data: gameService.getSerializedState()
        }));

        // Send player assignment
        ws.send(JSON.stringify({
            type: 'player_assigned',
            data: { side }
        }));

        // Handle messages from client
        ws.on('message', (message: string) => {
            try {
                const data = JSON.parse(message);
                
                switch (data.type) {
                    case 'paddle_move':
                        gameService.movePaddle(side, data.data.direction);
                        break;
                    case 'start_game':
                        gameService.serveBall();
                        break;
                    case 'reset_game':
                        gameService.reset();
                        gameService.initialize();
                        break;
                }
            } catch (error) {
                console.error('Error handling message:', error);
            }
        });

        // Handle player disconnection
        ws.on('close', () => {
            gameService.removePlayer(playerId);
        });
    });
} 