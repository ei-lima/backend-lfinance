const express           = require('express');
const userController    = require('../controllers/userController.js');
const authenticateToken = require('../middlewares/jwt.js');
const fieldValidator = require('../middlewares/fieldValidator.js');
const { checkRole } = require('../middlewares/authMiddleware.js');
const { permission } = require('../utils/configs.js');
const router            = express.Router();


// no auth
router.post('/login', userController.authUser);

// auth
router.use(authenticateToken);

router.post('/create', checkRole(permission.admin), fieldValidator(['name', 'cpf', 'email', 'password', 'roleId']), userController.createUser);

router.put('/update', checkRole(permission.admin, permission.operator), fieldValidator(['id', 'name', 'cpf', 'email', 'roleId']), userController.updateUser);

router.get('/profile/:id', checkRole(permission.admin, permission.operator), fieldValidator(['id']), userController.getUser);

router.get('/profiles', checkRole(permission.admin, permission.viewer, permission.operator), userController.getUsers);

router.delete('/delete/:id', checkRole(permission.admin), fieldValidator(['id']), userController.deleteUser);

module.exports = router;