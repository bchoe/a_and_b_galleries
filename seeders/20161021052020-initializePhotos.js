'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('Photos', [{
        author: 'Aaron',
        link: 'http://static2.businessinsider.com/image/562fd7f39dd7cc70408ba0c9-480/drake-hotline-bling.jpg',
        description: 'Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },{
        author: 'Craig Aaron',
        link: 'http://otherwords.org/wp-content/uploads/2012/12/Craig_Aaron.jpg',
        description: 'Drake Lover',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },{
        author: 'Aaron',
        link: 'http://static2.businessinsider.com/image/562fd7f39dd7cc70408ba0c9-480/drake-hotline-bling.jpg',
        description: 'Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },{
        author: 'Aaron',
        link: 'http://static2.businessinsider.com/image/562fd7f39dd7cc70408ba0c9-480/drake-hotline-bling.jpg',
        description: 'Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },{
        author: 'Aaron',
        link: 'http://static2.businessinsider.com/image/562fd7f39dd7cc70408ba0c9-480/drake-hotline-bling.jpg',
        description: 'Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },{
        author: 'Aaron',
        link: 'http://static2.businessinsider.com/image/562fd7f39dd7cc70408ba0c9-480/drake-hotline-bling.jpg',
        description: 'Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },{
        author: 'Aaron',
        link: 'http://static2.businessinsider.com/image/562fd7f39dd7cc70408ba0c9-480/drake-hotline-bling.jpg',
        description: 'Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      }], {});

  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Photos', null, {});
  }
};
