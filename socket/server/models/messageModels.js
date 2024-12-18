const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for a task
const messageSchema = new Schema({
    user: {
        type: String,
        required: [true, 'name is required'],
    },
    text: {
        type: String
    },
},
    {
        timestamps: { type: Date, default: Date.now }
    }
);

// maps to tasks collection in MongoDB
module.exports = mongoose.model('Message', messageSchema);