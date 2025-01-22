const express = require('express');
const userController = require('../controllers/userController.js');
const router = express.Router();

// group -> /users
router.get('/profile', userController.getProfile);

module.exports = router;