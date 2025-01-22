const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);

(async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error.message);
    }
})();

module.exports = sequelize;
