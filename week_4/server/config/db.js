const mongoose = require('mongoose');
require('dotenv').config()

// connection to database
const connectDB = async () => {
    const mongoURL = process.env.MongoURL;
    try {
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(mongoURL)
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch (err) {
        console.error(`Connection failed: ${err}`);
    }
}

module.exports = connectDB;