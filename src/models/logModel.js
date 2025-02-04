const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel');

const Log = sequelize.define('Log', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID, // 🔥 Compatível com a PK de Users
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'SET NULL'
    },
    action: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: { // 🔥 URL da requisição
        type: DataTypes.STRING,
        allowNull: false
    },
    oldData: { // 🔥 Dados antigos antes de update (JSON)
        type: DataTypes.JSON,
        allowNull: true
    },
    newData: { // 🔥 Dados novos após update (JSON)
        type: DataTypes.JSON,
        allowNull: true
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'logs',
    timestamps: false
});

module.exports = Log;
