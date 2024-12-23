const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define the schema for a task
const profileSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    email: {
        type: String
    },
    studentID: {
        type: String,
        required: [true, 'Student ID is required'],
    },
},
    {
        timestamps: true
    }
);

// maps to tasks collection in MongoDB
module.exports = mongoose.model('Profile', profileSchema);