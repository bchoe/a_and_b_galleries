'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'aaron',
      password: '1234',
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      username: 'bryan',
      password: '5678',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
