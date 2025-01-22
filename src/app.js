const express    = require('express');
const sequelize  = require('./config/db');
const userRoutes = require('./routes/userRoutes.js');
const app        = express();

(async () => {
    try {
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error.message);
    }
})();

// Rotas
app.use('/users', userRoutes);

module.exports = app;
