const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

// CORS enable kar rahe hain taaki different domains se request aa sake
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*", // Sabhi origins ko allow karne ke liye
        methods: ["GET", "POST"]
    }
});

// Jab koi connect hota hai
io.on('connection', (socket) => {
    console.log('A new device connected: ' + socket.id);

    // 1. Phone se Mouse Movement receive karna aur PC ko bhejna
    socket.on('mouse-move', (data) => {
        // broadcast.emit ka matlab hai sender ko chhod kar baki sabko bhejna
        socket.broadcast.emit('pc-move', data);
    });

    // 2. Mouse Click receive karna
    socket.on('mouse-click', (type) => {
        console.log('Click event:', type);
        socket.broadcast.emit('pc-click', type);
    });

    // 3. Keyboard Input receive karna
    socket.on('keyboard-key', (key) => {
        socket.broadcast.emit('pc-key', key);
    });

    socket.on('disconnect', () => {
        console.log('Device disconnected');
    });
});

// Port define kar rahe hain (Render/Railway ke liye process.env.PORT zaroori hai)
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`Jembee Server is running on port ${PORT}`);
});
