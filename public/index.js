require('dotenv').config();
const app = require('../src/app');
const sequelize = require('../src/config/db');

// Sincronizando com o banco
(async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexão bem-sucedida.');

        await sequelize.sync({ alter: false }); // Recria as tabelas
    } catch (error) {
        console.error('❌ Erro ao sincronizar banco:', error.message);
    }
})();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});