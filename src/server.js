const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// Create an Express app
const app = express();

// Create an HTTP server and wrap the Express app
const server = http.createServer(app);

// Initialize Socket.IO
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start listening on port 3000
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Arrays to store actions for state persistence and undo/redo
let actionHistory = [];

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send existing actions to the new client
    socket.emit('initialize', actionHistory);

    // Relay actions to all other clients and store them
    socket.on('action', (msg) => {
        const { type } = msg;

        if (type === 'clear') {
            // Reset the action history
            actionHistory = [];
            io.emit('action', msg); // Broadcast to all clients
        } else {
            // For all other actions, store and broadcast
            actionHistory.push(msg);
            socket.broadcast.emit('action', msg);
        }
    });

    // Receiving a message from a client
    socket.on('chatMessage', (msg) => {
        console.log('Message received:', msg);

        // Broadcasting the message to all clients
        io.emit('chatMessage', msg);

        if(msg.startsWith("/d ")) {
            try {
                msg = "Dice roll result: " + rollDice(msg.substring(3))
                io.emit('chatMessage', msg);
            } catch (err) {
                io.emit('chatMessage', 'wrong dice');
            }
        }
    });

    // Handle disconnections
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });

    function rollDice(expression) {
        // Regular expression to match dice rolls and numbers (e.g. 3d8, +3, -2)
        const dicePattern = /([+-]?\s*\d*d\d+|[+-]?\s*\d+)/g;
        let matches = expression.match(dicePattern);

        let total = 0;

        matches.forEach(match => {
            match = match.replace(/\s+/g, ''); // Remove whitespace

            // Check if the match is a dice roll (e.g. 3d8, 1d20) or just a number (e.g. +3, -1)
            if (match.includes('d')) {
                let [num, sides] = match.split('d').map(Number);

                // Handle cases like "d20" where the number of dice is omitted (assume it's 1)
                if (isNaN(num)) num = match.startsWith('-') ? -1 : 1;

                // Roll the dice and sum up the results
                for (let i = 0; i < Math.abs(num); i++) {
                    const roll = Math.floor(Math.random() * sides) + 1;
                    total += (num < 0) ? -roll : roll;
                }
            } else {
                // Handle static numbers like +3 or -1
                total += Number(match);
            }
        });

        return total;
    }
});
