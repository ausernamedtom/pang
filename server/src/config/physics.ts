/**
 * Physics configuration for the table tennis game
 * All values are in SI units (meters, kilograms, seconds)
 */

// Game world dimensions
export const WORLD = {
    WIDTH: 800,
    HEIGHT: 600,
    DEPTH: 100,
    NET_HEIGHT: 100,
    PADDLE_OFFSET: 50
};

// Ball properties
export const BALL = {
    RADIUS: 10,
    SPEED: 5,
    MASS: 0.0027, // Standard ball mass (2.7g)
    RESTITUTION: 0.8, // Bounciness coefficient
    FRICTION: 0.1, // Friction coefficient
    AIR_RESISTANCE: 0.0001, // Air resistance coefficient
    SPIN_DECAY: 0.99, // Spin decay rate per second
};

export const BALL_RADIUS = BALL.RADIUS;
export const BALL_SPEED = BALL.SPEED;

// Paddle properties
export const PADDLE = {
    WIDTH: 20,
    HEIGHT: 100,
    THICKNESS: 0.01, // Standard paddle thickness
    MASS: 0.17, // Standard paddle mass (170g)
    RESTITUTION: 0.8, // Bounciness coefficient
    FRICTION: 0.2, // Friction coefficient
    MAX_SPEED: 10, // Maximum paddle speed (m/s)
    ACCELERATION: 20, // Paddle acceleration (m/s²)
    SPEED: 5
};

// Physics engine settings
export const ENGINE = {
    GRAVITY: 0,
    TIME_STEP: 1/60, // Physics update rate (60 FPS)
    VELOCITY_ITERATIONS: 8, // Velocity solver iterations
    POSITION_ITERATIONS: 3, // Position solver iterations
    MAX_SUB_STEPS: 3, // Maximum sub-steps for interpolation
    FRICTION: 0.00001,
    FRICTION_AIR: 0.00001
};

// Collision categories
export const COLLISION_CATEGORIES = {
    BALL: 0x0001,
    PADDLE: 0x0002,
    TABLE: 0x0004,
    NET: 0x0008,
    WALL: 0x0004
};

// Spin effect multipliers
export const SPIN = {
    TOP_SPIN_MULTIPLIER: 1.2,
    BACK_SPIN_MULTIPLIER: 1.2,
    SIDE_SPIN_MULTIPLIER: 1.0,
};

export const SPIN_MULTIPLIER = 0.1; 