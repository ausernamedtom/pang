import WebSocket from 'ws';
import { WebSocketServer } from '../services/websocketServer';

// Use a different port for each test run
const PORT = Math.floor(Math.random() * 10000) + 50000;

interface ServerMessage {
    type: string;
    data: {
        side?: 'left' | 'right' | null;
        message?: string;
        position?: { x: number; y: number };
        velocity?: { x: number; y: number };
        score?: { left: number; right: number };
    };
}

function waitForConnection(ws: WebSocket): Promise<void> {
    return new Promise((resolve, reject) => {
        if (ws.readyState === WebSocket.OPEN) {
            resolve();
            return;
        }

        const timeout = setTimeout(() => {
            reject(new Error('Connection timeout'));
        }, 5000);

        ws.once('open', () => {
            clearTimeout(timeout);
            resolve();
        });

        ws.once('error', (error: Error) => {
            clearTimeout(timeout);
            reject(error);
        });
    });
}

function waitForMessage(ws: WebSocket, expectedType: string, timeout = 5000): Promise<ServerMessage> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            cleanup();
            reject(new Error(`Timeout waiting for message type ${expectedType}`));
        }, timeout);

        const messageHandler = (data: WebSocket.RawData) => {
            try {
                const message = JSON.parse(data.toString()) as ServerMessage;
                if (message.type === expectedType) {
                    cleanup();
                    resolve(message);
                }
            } catch (error) {
                // Continue waiting if this message isn't what we're looking for
            }
        };

        const errorHandler = (error: Error) => {
            cleanup();
            reject(error);
        };

        const cleanup = (): void => {
            clearTimeout(timer);
            ws.off('message', messageHandler);
            ws.off('error', errorHandler);
        };

        ws.on('message', messageHandler);
        ws.on('error', errorHandler);
    });
}

async function safeCloseWebSocket(ws: WebSocket | undefined): Promise<void> {
    if (!ws) return;
    
    return new Promise((resolve) => {
        if (ws.readyState === WebSocket.CLOSED) {
            resolve();
            return;
        }
        
        ws.once('close', () => resolve());
        ws.close();
    });
}

describe('WebSocketServer', () => {
    let wss: WebSocketServer;
    let client1: WebSocket;
    let client2: WebSocket;

    jest.setTimeout(30000); // Increase timeout for all tests in this suite

    beforeEach(async () => {
        // Create server first
        wss = new WebSocketServer(PORT);
        await wss.waitForReady();

        // Connect first client
        client1 = new WebSocket(`ws://localhost:${PORT}`);
        await waitForConnection(client1);
        const player1Assignment = await waitForMessage(client1, 'player_assigned');
        expect(player1Assignment.data.side).toBe('left');

        // Connect second client
        client2 = new WebSocket(`ws://localhost:${PORT}`);
        await waitForConnection(client2);
        const player2Assignment = await waitForMessage(client2, 'player_assigned');
        expect(player2Assignment.data.side).toBe('right');

        // Wait for initial game state
        await waitForMessage(client1, 'game_state');
    });

    afterEach(async () => {
        // Safely close all connections
        await Promise.all([
            safeCloseWebSocket(client1),
            safeCloseWebSocket(client2)
        ]);

        // Stop the server
        if (wss) {
            wss.stop();
        }

        // Wait for cleanup
        await new Promise(resolve => setTimeout(resolve, 100));
    });

    it('should handle paddle movement messages', async () => {
        client1.send(JSON.stringify({
            type: 'paddle_move',
            data: { side: 'left', direction: 'up' }
        }));

        const stateMessage = await waitForMessage(client1, 'game_state');
        expect(stateMessage.type).toBe('game_state');
        expect(stateMessage.data).toBeDefined();
    });

    it('should handle game start message', async () => {
        client1.send(JSON.stringify({
            type: 'start_game'
        }));

        const stateMessage = await waitForMessage(client1, 'game_state');
        expect(stateMessage.type).toBe('game_state');
        expect(stateMessage.data).toBeDefined();
    });

    it('should handle game reset message', async () => {
        client1.send(JSON.stringify({
            type: 'reset_game'
        }));

        const stateMessage = await waitForMessage(client1, 'game_state');
        expect(stateMessage.type).toBe('game_state');
        expect(stateMessage.data).toBeDefined();
    });

    it('should handle invalid messages', async () => {
        client1.send('invalid json');

        const errorMessage = await waitForMessage(client1, 'error');
        expect(errorMessage.type).toBe('error');
        expect(errorMessage.data.message).toBe('Invalid message format');
    });
}); 