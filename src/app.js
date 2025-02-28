const express           = require('express');
const userRoutes        = require('./routes/userRoutes.js');
const authRoutes        = require('./routes/authRoutes.js');
const app               = express();
const bodyParser        = require('body-parser');
const moment            = require('moment');
const helmet            = require('helmet');
const compression       = require('compression');
const logMiddleware     = require('./middlewares/logMiddleware.js');
const authenticateToken = require('./middlewares/jwt.js');
const cors              = require('cors');
moment.locale('pt-br');

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(compression());

app.disable('x-powered-by');

// Rotas
app.use('/auth', authRoutes);

app.use(authenticateToken);
app.use(logMiddleware);

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
