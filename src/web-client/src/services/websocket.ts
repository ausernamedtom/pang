import { GameState } from '../types/game';

interface ServerMessage {
    type: 'game_state' | 'player_assigned' | 'error';
    data: GameState | { side: 'left' | 'right' | null } | { message: string };
}

interface ClientMessage {
    type: 'paddle_move' | 'start_game' | 'reset_game';
    data?: {
        side?: 'left' | 'right';
        direction?: 'up' | 'down';
    };
}

type EventCallback<T = any> = (data: T) => void;

interface WebSocketMessage {
    type: string;
    data?: any;
}

export class WebSocketService {
    private ws: WebSocket | null = null;
    private eventHandlers: Map<string, EventCallback[]> = new Map();
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    async connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.url);

                this.ws.onopen = () => {
                    resolve();
                };

                this.ws.onerror = (error) => {
                    reject(error);
                };

                this.ws.onmessage = (event) => {
                    try {
                        const message: WebSocketMessage = JSON.parse(event.data);
                        const handlers = this.eventHandlers.get(message.type);
                        if (handlers) {
                            handlers.forEach(handler => handler(message.data));
                        }
                    } catch (error) {
                        console.error('Error parsing WebSocket message:', error);
                    }
                };

                this.ws.onclose = () => {
                    console.log('WebSocket connection closed');
                };
            } catch (error) {
                reject(error);
            }
        });
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    on<T = any>(event: string, callback: EventCallback<T>): void {
        const handlers = this.eventHandlers.get(event) || [];
        handlers.push(callback as EventCallback);
        this.eventHandlers.set(event, handlers);
    }

    off(event: string, callback: EventCallback): void {
        const handlers = this.eventHandlers.get(event);
        if (handlers) {
            const index = handlers.indexOf(callback);
            if (index !== -1) {
                handlers.splice(index, 1);
                if (handlers.length === 0) {
                    this.eventHandlers.delete(event);
                } else {
                    this.eventHandlers.set(event, handlers);
                }
            }
        }
    }

    send(message: WebSocketMessage): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            console.error('WebSocket is not connected');
        }
    }
} 