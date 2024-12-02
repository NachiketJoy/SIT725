const express = require('express');
const router = express.Router();
const Task = require('../models/taskModel');

// add new task
router.post('/api/tasks', async (req, res) => {
    try {
        // create task in mongoDB
        const task = await Task.create(req.body);
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// get list of all tasks
router.get('/api/tasks', async (req, res) => {
    try {
        // fetch all tasks from mongoDB
        const tasks = await Task.find();
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// get a specific task by id
router.get('/api/task/:id', async (req, res) => {
    try {
        //extract id from url path and fetch task from mongoDB
        const { id } = req.params;
        const task = await Task.findById(id);
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// delete a specific task
router.delete('/api/task/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.status(200).json(task);

    } catch(error) {
         res.status(500).json({ message: error.message });
    }
})

module.exports = router;