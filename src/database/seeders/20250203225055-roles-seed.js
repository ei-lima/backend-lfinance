'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const existingRoles = await queryInterface.sequelize.query(
      `SELECT name FROM roles WHERE name IN ('admin', 'viewer', 'limited', 'operator')`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const existingRoleNames = existingRoles.map(role => role.name);

    const rolesToInsert = [
      { id: 1, name: 'admin' },
      { id: 2, name: 'viewer' },
      { id: 3, name: 'limited' },
      { id: 4, name: 'operator' }
    ].filter(role => !existingRoleNames.includes(role.name));

    if (rolesToInsert.length > 0) {
      return queryInterface.bulkInsert('roles', rolesToInsert);
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('roles', null, {});
  }
};