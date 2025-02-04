'use strict';
// https://sequelize.org/docs/v7/cli/
const { generateHash } = require('../../utils/helpers');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const [adminUser] = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE name = 'Administrador' LIMIT 1;`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!adminUser) {
      const hashedPassword = await generateHash('admin');

      const [roleUser] = await queryInterface.sequelize.query(
        `SELECT id FROM roles WHERE name = 'admin' LIMIT 1;`,
        { type: Sequelize.QueryTypes.SELECT }
      );

      return queryInterface.bulkInsert('users', [{
        name: 'Administrador',
        email: 'admin@example.com',
        password: hashedPassword,
        cpf: null,
        created_at: new Date(),
        updated_at: new Date(),
        roleId: roleUser.id,
      }]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', { email: 'admin@example.com' });
  }
};