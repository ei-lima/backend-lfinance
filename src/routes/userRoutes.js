const express           = require('express');
const userController    = require('../controllers/userController.js');
const authenticateToken = require('../middlewares/jwt.js');
const fieldValidator = require('../middlewares/fieldValidator.js');
const router            = express.Router();

// no auth
router.post('/login', userController.authUser);

// auth
router.use(authenticateToken);

router.post('/create', fieldValidator(['name', 'cpf', 'email', 'password']), userController.createUser);

router.put('/update', fieldValidator(['id', 'name', 'cpf', 'email']), userController.updateUser);

router.get('/profile/:id', fieldValidator(['id']), userController.getUser);

router.get('/profiles', userController.getUsers);

router.delete('/delete/:id', fieldValidator(['id']), userController.deleteUser);

module.exports = router;