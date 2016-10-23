'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      username: 'aaron',
      password: '1234',
      profilePicture:'https://s-media-cache-ak0.pinimg.com/originals/bb/c3/a1/bbc3a115dea3b82d8b5b7fdff22c6a08.jpg',
      createdAt: new Date(),
      updatedAt: new Date()

    },{
      username: 'bryan',
      password: '5678',
      profilePicture:'https://pbs.twimg.com/profile_images/648199060369702912/KuCIPBkm.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
