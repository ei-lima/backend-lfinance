const jwt = require('jsonwebtoken');
const { secretKey } = require('../utils/configs');
const User = require('../models/userModel');

// Rota de teste
exports.getProfile = (req, res) => {
    res.send('Profile');
};

// Rota de autenticação (login)
exports.authUser = async (req, res) => {
    const { email, password } = req.body;

    const userFounded = (await User.findOne({ email, password }))?.toJSON();

    if (!userFounded) {
        return res.status(401).json({ error: 'Usuário não encontrado.' });
    }

    if (email !== userFounded.email || password !== userFounded.password) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ id: userFounded.id, username: userFounded.username }, secretKey, {
        expiresIn: '60s',
    });

    res.json({ token }).end();
};

exports.createUser = async (req, res) => {
    const { name, cpf, email, password } = req.body;

    const userFounded = (await User.findOne({ email, cpf }))?.toJSON();

    if (userFounded) {
        return res.status(400).json({ error: 'Usuário ja existente.' });
    }

    const userCreated = (await User.create(req.body))?.toJSON();

    if (!userCreated) {
        return res.status(500).json({ error: 'Falha ao criar usuário' });
    }

    return res.status(201).json({ data: userCreated });
}

exports.findUserById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Parâmetro 'id' não informado." });
    }

    const userFounded = (await User.findOne({ where: { id: id } }))?.toJSON();

    return res.status(200).json(userFounded);
}