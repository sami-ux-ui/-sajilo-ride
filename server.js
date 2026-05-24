const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const routes = require('./routes/routes');
const socketHandler = require('./sockets/socketHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors({
  origin: '*', // For standard local multi-port sandbox testing
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Main REST API Mount
app.use('/api', routes);

// Base route for server checking
app.get('/', (req, res) => {
  res.json({
    name: "Sajilo Ride API",
    status: "online",
    message: "Namaste! Welcome to Sajilo Ride full-stack server."
  });
});

// Create HTTP server
const server = http.createServer(app);

// Bind Socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Orchestrate socket connections
socketHandler(io);

// Start server
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 SAJILO RIDE BACKEND IS RUNNING SUCCESSFULLY`);
  console.log(`🌍 Server API base: http://localhost:${PORT}`);
  console.log(`🔌 WebSocket port: ws://localhost:${PORT}`);
  console.log(`====================================================`);
});
