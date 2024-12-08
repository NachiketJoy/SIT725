const express = require('express');
const app = express();
const path = require('path');

const PORT = 3001;

// connection to mongoDB
// import database connection logic, task and profile routes
const connectDB = require('./server/config/db'); 
const taskRoutes = require('./server/routes/task');
const profileRoutes = require('./server/routes/profile');

// connect to database
connectDB();

// serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));
// serve node_modules for dependencies
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(express.json());

// serve the homepage
app.use('/', require('./server/routes/main'))

// api routes for CRUD operations on tasks
app.use(taskRoutes);
app.use(profileRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});