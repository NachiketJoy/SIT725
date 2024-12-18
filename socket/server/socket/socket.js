const Message = require('../models/messageModels');
const { saveMessage } = require('../controllers/messageController'); // Import saveMessage function

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        // Emit previous messages to new user
        socket.on('join', async () => {
            try {
                const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
                socket.emit('previousMessages', messages); // Send messages to the client
            } catch (err) {
                console.error(err);
            }
        });

        // Listen for new messages and broadcast them to everyone
        socket.on('chatMessage', async (msg) => {
            try {
                // Save the new message to the database
                const newMessage = await saveMessage(msg.user, msg.text);

                // Broadcast the new message to all connected clients
                io.emit('chatMessage', newMessage);
            } catch (err) {
                console.error(err);
            }
        });

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};
