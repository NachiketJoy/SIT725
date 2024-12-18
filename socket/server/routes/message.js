const express = require('express');
const router = express.Router();
const taskController = require('../controllers/messageController');

router.get('/api/messages', taskController.fetchMessage);
router.post('/api/message', taskController.saveMessage);

module.exports = router;