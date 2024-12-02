const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for a task
const taskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Title is required'],
    },
},
    {
        timestamps: true
    }
);

// maps to tasks collection in MongoDB
module.exports = mongoose.model('Task', taskSchema);