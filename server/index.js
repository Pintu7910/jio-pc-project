const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

io.on('connection', (socket) => {
  console.log('🚀 DEBUG: New User Connected ->', socket.id);

  socket.on('tv-move-cursor', (data) => {
    // Agar ye log Render mein nahi dikh raha, matlab phone se signal nahi aa raha
    console.log(`📡 Signal from ${socket.id}: dx=${data.dx.toFixed(2)}, dy=${data.dy.toFixed(2)}`);
    io.emit('tv-move-cursor', data); 
  });

  socket.on('mouse-click', (type) => {
    console.log(`🖱️ DEBUG: Click Event -> ${type}`);
    io.emit('tv-click-execute', type);
  });

  socket.on('disconnect', () => {
    console.log('🔌 DEBUG: User Disconnected ->', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`✅ Jembee Debug Server running on port ${PORT}`);
});
