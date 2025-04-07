import * as Matter from 'matter-js';
import {
    WORLD,
    BALL,
    PADDLE,
    ENGINE,
    COLLISION_CATEGORIES,
    SPIN
} from '../config/physics';

let physicsService: PhysicsService | null = null;

export function setupPhysics(): PhysicsService {
    if (!physicsService) {
        physicsService = new PhysicsService();
    }
    return physicsService;
}

export class PhysicsService {
    private engine: Matter.Engine;
    private world: Matter.World;
    private bodies: Map<string, Matter.Body> = new Map();
    private ball: Matter.Body | null = null;

    constructor() {
        // Create physics engine
        this.engine = Matter.Engine.create();
        this.world = this.engine.world;

        // Configure engine
        this.engine.gravity.y = ENGINE.GRAVITY;
        this.engine.constraintIterations = ENGINE.VELOCITY_ITERATIONS;
        this.engine.positionIterations = ENGINE.POSITION_ITERATIONS;

        // Create world boundaries
        this.createWorldBoundaries();
    }

    private createWorldBoundaries() {
        // Create table boundaries
        const table = Matter.Bodies.rectangle(
            WORLD.WIDTH / 2,
            WORLD.HEIGHT / 2,
            WORLD.WIDTH,
            WORLD.DEPTH,
            {
                isStatic: true,
                collisionFilter: {
                    category: COLLISION_CATEGORIES.TABLE
                }
            }
        );

        // Create net
        const net = Matter.Bodies.rectangle(
            WORLD.WIDTH / 2,
            WORLD.HEIGHT / 2,
            0.01, // Thin net
            WORLD.NET_HEIGHT,
            {
                isStatic: true,
                collisionFilter: {
                    category: COLLISION_CATEGORIES.NET
                }
            }
        );

        Matter.World.add(this.world, [table, net]);
    }

    public createBall(x: number, y: number): Matter.Body {
        const ball = Matter.Bodies.circle(x, y, BALL.RADIUS, {
            mass: BALL.MASS,
            restitution: BALL.RESTITUTION,
            friction: BALL.FRICTION,
            frictionAir: BALL.AIR_RESISTANCE,
            collisionFilter: {
                category: COLLISION_CATEGORIES.BALL
            }
        });

        Matter.World.add(this.world, ball);
        this.bodies.set('ball', ball);
        return ball;
    }

    public createPaddle(x: number, y: number): Matter.Body {
        const paddle = Matter.Bodies.rectangle(x, y, PADDLE.WIDTH, PADDLE.HEIGHT, {
            mass: PADDLE.MASS,
            restitution: PADDLE.RESTITUTION,
            friction: PADDLE.FRICTION,
            collisionFilter: {
                category: COLLISION_CATEGORIES.PADDLE
            }
        });

        Matter.World.add(this.world, paddle);
        this.bodies.set('paddle', paddle);
        return paddle;
    }

    public update(deltaTime: number): void {
        Matter.Engine.update(this.engine, deltaTime * 1000);
    }

    public applySpin(body: Matter.Body, spin: number): void {
        const spinForce = spin * SPIN.SIDE_SPIN_MULTIPLIER;
        Matter.Body.applyForce(body, body.position, { x: 0, y: spinForce });
    }

    public getBody(id: string): Matter.Body | undefined {
        return this.bodies.get(id);
    }

    public removeBody(id: string) {
        const body = this.bodies.get(id);
        if (body) {
            Matter.World.remove(this.world, body);
            this.bodies.delete(id);
        }
    }

    public getBodies(): Matter.Body[] {
        return Array.from(this.bodies.values());
    }

    private setupWorld(): void {
        this.engine = Matter.Engine.create();
        this.engine.world.gravity.y = ENGINE.GRAVITY;
        Matter.Engine.run(this.engine);
    }

    private createBodies(): void {
        // Create walls
        const walls = [
            Matter.Bodies.rectangle(WORLD.WIDTH / 2, 0, WORLD.WIDTH, 20, { isStatic: true, collisionFilter: { category: COLLISION_CATEGORIES.WALL } }), // Top
            Matter.Bodies.rectangle(WORLD.WIDTH / 2, WORLD.HEIGHT, WORLD.WIDTH, 20, { isStatic: true, collisionFilter: { category: COLLISION_CATEGORIES.WALL } }), // Bottom
            Matter.Bodies.rectangle(0, WORLD.HEIGHT / 2, 20, WORLD.HEIGHT, { isStatic: true, collisionFilter: { category: COLLISION_CATEGORIES.WALL } }), // Left
            Matter.Bodies.rectangle(WORLD.WIDTH, WORLD.HEIGHT / 2, 20, WORLD.HEIGHT, { isStatic: true, collisionFilter: { category: COLLISION_CATEGORIES.WALL } }) // Right
        ];

        walls.forEach(wall => Matter.World.add(this.engine.world, wall));
    }

    initialize(): void {
        // Create walls
        const walls = [
            Matter.Bodies.rectangle(WORLD.WIDTH / 2, 0, WORLD.WIDTH, 20, { isStatic: true }), // Top
            Matter.Bodies.rectangle(WORLD.WIDTH / 2, WORLD.HEIGHT, WORLD.WIDTH, 20, { isStatic: true }), // Bottom
            Matter.Bodies.rectangle(0, WORLD.HEIGHT / 2, 20, WORLD.HEIGHT, { isStatic: true }), // Left
            Matter.Bodies.rectangle(WORLD.WIDTH, WORLD.HEIGHT / 2, 20, WORLD.HEIGHT, { isStatic: true }) // Right
        ];

        Matter.World.add(this.world, walls);
    }

    serveBall(): void {
        if (this.ball) {
            Matter.World.remove(this.world, this.ball);
        }

        this.ball = Matter.Bodies.circle(WORLD.WIDTH / 2, WORLD.HEIGHT / 2, 10, {
            restitution: 1,
            friction: 0,
            frictionAir: 0
        });

        // Serve ball with random direction
        const angle = Math.random() * Math.PI / 2 - Math.PI / 4; // -45 to 45 degrees
        const speed = 5;
        Matter.Body.setVelocity(this.ball, {
            x: Math.cos(angle) * speed,
            y: Math.sin(angle) * speed
        });

        Matter.World.add(this.world, this.ball);
    }

    reset(): void {
        if (this.ball) {
            Matter.World.remove(this.world, this.ball);
            this.ball = null;
        }
    }

    getBallPosition(): { x: number; y: number } | null {
        return this.ball ? this.ball.position : null;
    }
} 