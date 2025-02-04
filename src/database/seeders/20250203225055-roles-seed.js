'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingRoles = await queryInterface.sequelize.query(
      `SELECT name FROM roles WHERE name IN ('admin', 'viewer', 'limited', 'operator')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingRoleNames = existingRoles.map(role => role.name);

    const rolesToInsert = [
      { name: 'admin' },
      { name: 'viewer' },
      { name: 'limited' },
      { name: 'operator' }
    ].filter(role => !existingRoleNames.includes(role.name)); // Filtra roles já existentes

    if (rolesToInsert.length > 0) {
      return queryInterface.bulkInsert('roles', rolesToInsert);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};