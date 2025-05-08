
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

let rooms = {};

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('createRoom', ({ userName, roomCode }) => {
        socket.join(roomCode);

        rooms[roomCode] = {
            votes: { option1: 0, option2: 0 },
            timer: 60,
            intervalStarted: false,
            votedUsers: new Set()
        };

        console.log(`${userName} created room ${roomCode}`);
        socket.emit('roomCreated', roomCode);
    });

    socket.on('joinRoom', ({ roomCode, userName }) => {
        socket.join(roomCode);
        console.log(`${userName} joined room ${roomCode}`);

        if (!rooms[roomCode]) {
            rooms[roomCode] = {
                votes: { option1: 0, option2: 0 },
                timer: 60,
                intervalStarted: false,
                votedUsers: new Set()
            };
        }

        socket.emit('voteUpdate', rooms[roomCode].votes);
        socket.emit('timerUpdate', rooms[roomCode].timer);

        if (!rooms[roomCode].intervalStarted) {
            rooms[roomCode].intervalStarted = true;

            const countdownInterval = setInterval(() => {
                if (rooms[roomCode]) {
                    rooms[roomCode].timer--;
                    io.to(roomCode).emit('timerUpdate', rooms[roomCode].timer);

                    if (rooms[roomCode].timer <= 0) {
                        clearInterval(countdownInterval);
                    }
                }
            }, 1000);
        }
    });

    socket.on('vote', ({ roomCode, option, userName }) => {
        const room = rooms[roomCode];
        if (room && room.votes[option] !== undefined) {
            if (!room.votedUsers.has(userName)) {
                room.votes[option]++;
                room.votedUsers.add(userName);
                io.to(roomCode).emit('voteUpdate', room.votes);
            } else {
                socket.emit('errorMessage', 'You have already voted.');
            }
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});
