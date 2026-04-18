const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('User Connected: ' + socket.id);

    // Mouse Movement
    socket.on('tv-move-cursor', (data) => {
        // io.emit ensures signal reaches EVERYONE
        io.emit('tv-move-cursor', data); 
    });

    // Mouse Click
    socket.on('mouse-click', (type) => {
        io.emit('tv-click-execute', type);
    });

    // Keyboard Input
    socket.on('keyboard-type', (key) => {
        io.emit('tv-type-key', key);
    });

    socket.on('disconnect', () => {
        console.log('User Disconnected');
    });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Jembee Server live on port ${PORT}`);
});
