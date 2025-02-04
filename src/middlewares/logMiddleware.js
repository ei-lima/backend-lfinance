const Log = require('../models/logModel');

const logMiddleware = async (req, res, next) => {
    try {
        const userId = req.user?.id || null;
        const action = req.method;
        const url = req.originalUrl;
        const details = `Ação ${action} na URL ${url}`;
        let oldData = null;
        let newData = null;

        if (req.method === 'PUT' || req.method === 'DELETE') {
            const modelName = getModelFromUrl(url);

            const Model = require(`../models/${modelName}`);

            let payload = req.params;

            if (!Object.keys(payload).length) {
                payload = req.body;
            }

            if (Model) {
                const instance = await Model.findByPk(payload.id);
                oldData = instance ? instance.toJSON() : null;
            }
        }

        if (req.method === 'POST' || req.method === 'PUT') {
            newData = req.body;
        }

        await Log.create({ userId, action, url, oldData, newData, details });

        next();
    } catch (error) {
        console.error('Erro ao registrar log:', error);
        next();
    }
};

const getModelFromUrl = (url) => {
    const mapping = {
        'users': 'userModel'
    };
    return mapping[url.split('/')[1]] || null;
};

module.exports = logMiddleware;
