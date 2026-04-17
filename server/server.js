const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    socket.on('mouse-move', (data) => {
        socket.broadcast.emit('tv-move-cursor', data);
    });
    socket.on('mouse-click', () => {
        socket.broadcast.emit('tv-click-execute');
    });
    socket.on('keyboard-type', (key) => {
        socket.broadcast.emit('tv-type-key', key);
    });
});

const PORT = 3001;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
