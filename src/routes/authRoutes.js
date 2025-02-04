const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const logMiddleware = require('../middlewares/logMiddleware.js');

const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutos
    max: 5, // Máximo de 5 tentativas
    message: 'Muitas tentativas de login. Tente novamente mais tarde.'
});

router.use(logMiddleware)
// no auth
router.post('/login', loginLimiter, userController.authUser);

module.exports = router;