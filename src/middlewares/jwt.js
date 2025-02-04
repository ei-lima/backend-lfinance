const jwt = require('jsonwebtoken');
const { secretKey, defaultReturnUsers } = require('../utils/configs');
const User = require('../models/userModel');
require('dotenv').config();

const authenticateToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token ausente ou inválido' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        const user = await User.findByPk(decoded.id, defaultReturnUsers);

        if (!user) {
            return res.status(403).json({ error: 'Usuário não encontrado' });
        }

        req.user = user.toJSON();
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido' });
    }
};

module.exports = authenticateToken;