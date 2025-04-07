import express from 'express';
import { WebSocketServer } from 'ws';
import { setupGameSocket } from './sockets/gameSocket';
import { setupPhysics } from './services/physics';

const app = express();
const port = process.env.PORT || 3001;

// Create HTTP server
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Setup game socket
setupGameSocket(wss);

// Setup physics service
const physicsService = setupPhysics();

// Handle graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received. Closing HTTP server...');
    server.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
    });
}); 