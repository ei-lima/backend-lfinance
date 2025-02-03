const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../database/config/config.json')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config);

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error.message);
    }
})();

module.exports = sequelize;
