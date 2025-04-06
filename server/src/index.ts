import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config';

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

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = config.port || 3001;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 