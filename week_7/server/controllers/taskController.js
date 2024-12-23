const Task = require('../models/taskModel');

// function to create a new task in the database
exports.createTask = async (req, res) => {
    try {
        // create task in mongoDB
        const task = await Task.create(req.body);
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// function to fetch all task in the database
exports.fetchAllTasks = async (req, res) => {
    try {
        // fetch all tasks from mongoDB
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// function to retrieve a specific task in the database by id
exports.fetchTask = async (req, res) => {
    try {
        //extract id from url path and fetch task from mongoDB
        const { id } = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// function to delete a specific task in the database by id
exports.deleteTask = async (req, res) => {
    try {
        //extract id from url path and delete task from mongoDB
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}