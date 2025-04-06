import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { setupGameSocket } from './sockets/gameSocket';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Setup game socket handlers
setupGameSocket(io);

const PORT = 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 