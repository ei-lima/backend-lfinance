const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const { v4: uuidv4 } = require('uuid');
const Role = require('./roleModel');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: true,
        limit: 155
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'id'
        }
    }
}, {
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    defaultScope: {
        include: [{
            model: Role,
            as: 'role',
            attributes: ['id', 'name']
        }]
    }
});

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });

module.exports = User;