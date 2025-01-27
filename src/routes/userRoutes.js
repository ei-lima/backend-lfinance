const express           = require('express');
const userController    = require('../controllers/userController.js');
const authenticateToken = require('../middlewares/jwt.js');
const router            = express.Router();

// group -> /users
// no auth
router.post('/login', userController.authUser);

// auth
router.use(authenticateToken);

router.get('/profile/:id', userController.findUserById);

router.post('/create', userController.createUser);

module.exports = router;