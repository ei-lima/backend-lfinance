const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/configs');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token ausente ou inválido' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }

        req.user = user;
        next();
    });
};

module.exports = authenticateToken;