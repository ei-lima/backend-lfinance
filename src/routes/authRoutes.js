const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const logMiddleware = require('../middlewares/logMiddleware.js');

router.use(logMiddleware)
// no auth
router.post('/login', userController.authUser);

module.exports = router;