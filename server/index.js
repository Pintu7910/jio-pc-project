const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

// CORS setting for Vercel interaction
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Connected: ' + socket.id);

    // Ye event name aapke Trackpad aur VirtualCursor se match hona chahiye
    socket.on('tv-move-cursor', (data) => {
        // console.log("Moving:", data); // Debugging ke liye check kar sakti hain
        socket.broadcast.emit('tv-move-cursor', data);
    });

    socket.on('mouse-click', () => {
        socket.broadcast.emit('tv-click-execute');
    });

    socket.on('keyboard-type', (key) => {
        socket.broadcast.emit('tv-type-key', key);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected');
    });
});

// Render ke liye process.env.PORT bahut zaroori hai
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Jembee Server is running on port ${PORT}`);
});
