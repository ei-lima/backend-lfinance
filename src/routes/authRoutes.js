const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// no auth
router.post('/login', userController.authUser);

module.exports = router;