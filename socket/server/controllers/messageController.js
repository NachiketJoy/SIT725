// server/controllers/messageController.js
const Message = require('../models/messageModels');

// Function to fetch messages from the database
exports.fetchMessage = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 }).limit(50);
        res.json(messages);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// Function to save a new message to the database
exports.saveMessage = async (user, text) => {
    try {
        const newMessage = new Message({
            user,
            text
        });
        await newMessage.save();
        return newMessage; // Return the saved message
    } catch (err) {
        console.error(err);
        throw new Error('Error saving message');
    }
};
