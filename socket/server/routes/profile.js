const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/api/profiles', profileController.fetchProfileDetail);

module.exports = router;