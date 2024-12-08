const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/api/tasks', taskController.fetchAllTasks);
router.get('/api/task/:id', taskController.fetchTask);
router.post('/api/tasks', taskController.createTask);
router.delete('/api/task/:id', taskController.deleteTask);

module.exports = router;