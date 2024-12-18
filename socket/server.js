const express = require('express');
const app = express();
const path = require('path');

// initialize socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3001;

// connection to mongoDB
// import database connection logic, task and profile routes
const connectDB = require('./server/config/db'); 
const taskRoutes = require('./server/routes/task');
const profileRoutes = require('./server/routes/profile');
const messageRoutes = require('./server/routes/message');

// connect to database
connectDB();

// Load Socket.IO controller
require('./server/socket/socket')(io);

// serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
// serve node_modules for dependencies
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(express.json());

// serve the homepage
app.use('/', require('./server/routes/main'))

// api routes tasks and profiles
app.use(taskRoutes);
app.use(profileRoutes);
app.use(messageRoutes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app; 