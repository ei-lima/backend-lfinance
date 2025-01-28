const jwt = require('jsonwebtoken');
const { secretKey, timeToTokenExpiresInHours } = require('../utils/configs');
const User = require('../models/userModel');
const UserRequest = require('../models/userModel');
const moment = require('moment');

exports.authUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userFounded = (await User.findOne({ where: { email }}))?.toJSON();

        if (!userFounded) {
            return res.status(401).json({ error: 'Usuário não encontrado.' });
        }

        if (email !== userFounded.email && password !== userFounded.password) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const user_email = userFounded.email;

        const token = jwt.sign({ id: userFounded.id, username: userFounded.username }, secretKey, {
            expiresIn: timeToTokenExpiresInHours + 'h',
        });

        const time_plus_tree_ours = moment().add(timeToTokenExpiresInHours, 'hours');

        const expires_at = time_plus_tree_ours.format('LLLL');

        const expires_at_timestamp = time_plus_tree_ours.toDate().getTime();

        res.status(200).json({ expires_at_timestamp, user_email, expires_at, token });
    } catch (error) {
        return res.status(500).json({ error: error.errors?.[0]?.message ?? error });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { cpf, email } = req.body;

        console.log(UserRequest(req.body))

        const userFounded = await User.findOne({ where: { email, cpf } });

        if (userFounded) {
            return res.status(400).json({ error: 'Usuário ja existente.' });
        }

        const userCreated = (await User.create(req.body))?.toJSON();

        if (!userCreated) {
            return res.status(500).json({ error: 'Falha ao criar usuário' });
        }

        return res.status(201).json(userCreated);
    } catch (error) {
        return res.status(500).json({ error: error.errors?.[0]?.message ?? error });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Identificador do usuário não informado.' });
        }


        const userFounded = await User.findOne({ where: { id } });

        if (!userFounded) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        userFounded.set(req.body);

        await userFounded.save();

        if (!userFounded) {
            return res.status(500).json({ error: 'Falha ao salvar usuário' });
        }

        return res.status(200).json(userFounded?.toJSON());
    } catch (error) {
        return res.status(500).json({ error: error.errors?.[0]?.message ?? error});
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'Identificador do usuário não informado.' });
        }

        const userFounded = (await User.findByPk(id))?.toJSON();

        return res.status(200).json(userFounded);
    } catch (error) {
        return res.status(500).json({ error: error.errors?.[0]?.message ?? error });
    }
}

exports.getUsers = async (req, res) => {
    try {
        const userFounded = await User.findAll();

        return res.status(200).json(userFounded);
    } catch (error) {
        return res.status(500).json({ error: error.errors?.[0]?.message ?? error });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: "Identificador do usuário não informado." });
        }

        const userFounded = (await User.findOne({ where: { id: id } }));

        await userFounded.destroy();

        return res.status(200).json({ data: "Usuário removido com sucesso." });
    } catch (error) {
        return res.status(500).json({ error: error.errors?.[0]?.message ?? error });
    }
}