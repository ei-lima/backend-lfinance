const Log = require('../models/logModel');

const logAction = async ({ userId, action, url, oldData = null, newData = null, details = '' }) => {
    try {
        await Log.create({ userId, action, url, oldData, newData, details });
    } catch (error) {
        console.error('Erro ao registrar log:', error);
    }
};

module.exports = logAction;