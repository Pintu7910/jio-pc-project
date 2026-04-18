const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log("Client connected:", socket.id);

  // 🔥 MOUSE MOVE
  socket.on('move', (data) => {
    console.log("MOVE:", data);
    io.emit('move', data);
  });

  // 🔥 CLICK
  socket.on('click', () => {
    console.log("CLICK");
    io.emit('click');
  });

  // 🔥 KEYBOARD
  socket.on('type', (key) => {
    console.log("TYPE:", key);
    io.emit('type', key);
  });

  socket.on('disconnect', () => {
    console.log("Disconnected:", socket.id);
  });
});

const PORT = 3001;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
});
