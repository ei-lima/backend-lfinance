const express           = require('express');
const sequelize         = require('./config/db');
const userRoutes        = require('./routes/userRoutes.js');
const app               = express();
const bodyParser        = require('body-parser');
const moment            = require('moment');
const helmet            = require('helmet');
const compression       = require('compression')
moment.locale('pt-br');

app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.disable('x-powered-by');

(async () => {
    try {
        await sequelize.sync({ force: false }); // ao deixar como true, sempre ira forcar o banco se atualizar com a model
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error.message);
    }
})();

// Rotas
app.use('/users', userRoutes);


app.use((req, res, next) => {
    // Retorna uma página HTML
    res.status(404).send(`
        <html>
            <head>
                <title>Permissão Negada</title>
            </head>
            <body>
                <h1>404 - Página não encontrada</h1>
                <p>Você não tem permissão para acessar esta página.</p>
                <a href="/">Voltar para a página inicial</a>
            </body>
        </html>
    `);
});

module.exports = app;
