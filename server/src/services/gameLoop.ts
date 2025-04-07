import { GameService } from './game';
import { PhysicsService } from './physics';

export class GameLoopService {
    private gameService: GameService;
    private physicsService: PhysicsService;
    private updateCallback: (() => void) | null = null;
    private frameId: NodeJS.Timeout | null = null;
    private lastTime: number = 0;

    constructor(gameService: GameService, physicsService: PhysicsService) {
        this.gameService = gameService;
        this.physicsService = physicsService;
    }

    public setUpdateCallback(callback: () => void): void {
        this.updateCallback = callback;
    }

    public start(): void {
        this.lastTime = Date.now();
        this.update();
    }

    public stop(): void {
        if (this.frameId !== null) {
            clearTimeout(this.frameId);
            this.frameId = null;
        }
    }

    private update(): void {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastTime) / 1000; // Convert to seconds
        this.lastTime = currentTime;

        this.physicsService.update(deltaTime);
        if (this.updateCallback) {
            this.updateCallback();
        }

        this.frameId = setTimeout(() => this.update(), 16); // ~60 FPS
    }
} 