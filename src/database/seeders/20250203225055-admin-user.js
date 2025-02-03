'use strict';
// https://sequelize.org/docs/v7/cli/
const { generateHash } = require('../../utils/helpers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await generateHash('admin');

    return queryInterface.bulkInsert('users', [{
      name: 'Administrador',
      email: 'admin@example.com',
      password: hashedPassword,
      cpf: null,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'admin@example.com' });
  }
};
