const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Role = sequelize.define('Role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Define o tipo de usuário e suas permissões: admin (geral), viewer (apenas visualiza), limited (geral mas limitado), operator (lanca dados).'
    }
}, {
    tableName: 'roles',
    timestamps: false
});

module.exports = Role;