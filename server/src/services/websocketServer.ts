import { WebSocket, WebSocketServer as WSServer } from 'ws';
import { GameService, SerializedGameState } from './game';
import { GameLoopService } from './gameLoop';
import { PhysicsService } from './physics';

interface ClientMessage {
    type: 'paddle_move' | 'start_game' | 'reset_game';
    data?: {
        side?: 'left' | 'right';
        direction?: 'up' | 'down';
    };
}

interface ServerMessage {
    type: 'game_state' | 'player_assigned' | 'error';
    data: SerializedGameState | { side: 'left' | 'right' | null } | { message: string };
}

export class WebSocketServer {
    private wss: WSServer;
    private gameService: GameService;
    private gameLoopService: GameLoopService;
    private clients: Map<WebSocket, { side: 'left' | 'right' | null }> = new Map();
    private messageQueue: Map<WebSocket, ServerMessage[]> = new Map();

    constructor(port: number) {
        const physicsService = new PhysicsService();
        this.gameService = new GameService(physicsService);
        this.gameLoopService = new GameLoopService(this.gameService, physicsService);

        this.wss = new WSServer({ port });
        this.setupWebSocketServer();

        // Set up game state broadcast
        this.gameLoopService.setUpdateCallback(() => {
            this.broadcastGameState();
        });
    }

    public async waitForReady(): Promise<void> {
        return new Promise((resolve) => {
            // Check if server is already listening
            const address = this.wss.address();
            if (address) {
                resolve();
                return;
            }

            this.wss.once('listening', () => {
                resolve();
            });
        });
    }

    private setupWebSocketServer(): void {
        this.wss.on('connection', (ws: WebSocket) => {
            // Initialize message queue for this client
            this.messageQueue.set(ws, []);

            // Assign side to the new player (left or right)
            let assignedSide: 'left' | 'right' | null = null;
            
            if (!this.hasPlayerOnSide('left')) {
                assignedSide = 'left';
            } else if (!this.hasPlayerOnSide('right')) {
                assignedSide = 'right';
            }

            this.clients.set(ws, { side: assignedSide });

            // Queue player assignment message
            this.queueMessage(ws, {
                type: 'player_assigned',
                data: { side: assignedSide }
            });

            // Initialize game if this is the first connection
            if (this.clients.size === 1) {
                this.gameService.initialize();
                this.gameLoopService.start();
            }

            // Process queued messages after a short delay to ensure connection is ready
            setTimeout(() => this.processMessageQueue(ws), 100);

            ws.on('message', (message: string) => {
                try {
                    const parsedMessage = JSON.parse(message) as ClientMessage;
                    this.handleClientMessage(ws, parsedMessage);
                } catch (error) {
                    this.sendError(ws, 'Invalid message format');
                }
            });

            ws.on('close', () => {
                this.handleClientDisconnection(ws);
            });
        });
    }

    private queueMessage(ws: WebSocket, message: ServerMessage): void {
        const queue = this.messageQueue.get(ws);
        if (queue) {
            queue.push(message);
        }
    }

    private processMessageQueue(ws: WebSocket): void {
        const queue = this.messageQueue.get(ws);
        if (!queue) return;

        while (queue.length > 0) {
            const message = queue.shift();
            if (message) {
                this.sendMessage(ws, message);
            }
        }
    }

    private handleClientMessage(ws: WebSocket, message: ClientMessage): void {
        const client = this.clients.get(ws);
        if (!client) return;

        switch (message.type) {
            case 'paddle_move':
                if (message.data?.side === client.side) {
                    this.gameService.movePaddle(
                        message.data.side,
                        message.data.direction || 'up'
                    );
                }
                break;

            case 'start_game':
                this.gameService.serveBall();
                break;

            case 'reset_game':
                this.gameService.reset();
                this.gameService.initialize();
                break;

            default:
                this.sendError(ws, 'Unknown message type');
        }
    }

    private handleClientDisconnection(ws: WebSocket): void {
        this.clients.delete(ws);
        this.messageQueue.delete(ws);

        // Stop game loop if no clients are connected
        if (this.clients.size === 0) {
            this.gameLoopService.stop();
            this.gameService.reset();
        }
    }

    private hasPlayerOnSide(side: 'left' | 'right'): boolean {
        for (const [, client] of this.clients) {
            if (client.side === side) return true;
        }
        return false;
    }

    private broadcastGameState(): void {
        const state = this.gameService.getSerializedState();
        const message: ServerMessage = {
            type: 'game_state',
            data: state
        };

        this.broadcast(message);
    }

    private broadcast(message: ServerMessage): void {
        const messageStr = JSON.stringify(message);
        this.wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(messageStr);
            }
        });
    }

    private sendMessage(ws: WebSocket, message: ServerMessage): void {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    }

    private sendError(ws: WebSocket, error: string): void {
        this.sendMessage(ws, {
            type: 'error',
            data: { message: error }
        });
    }

    public stop(): void {
        this.gameLoopService.stop();
        this.wss.close();
    }
} 