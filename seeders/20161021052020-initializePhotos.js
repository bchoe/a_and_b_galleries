'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('Photos', [{
        author: 'Hipster',
        link: 'http://i.imgur.com/xtcghTT.jpg',
        description: 'not Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },{
        author: 'Hawaii',
        link: 'http://i.imgur.com/Xlo6xmZ.jpg',
        description: 'Drake Lover',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },{
        author: 'tmblr',
        link: 'http://i.imgur.com/xZumQxb.jpg',
        description: 'Asian Hipster girl',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3
      },{
        author: 'azn',
        link: 'http://wall-papers.info/images/hd-travel-wallpapers/hd-travel-wallpapers-3.jpg',
        description: 'My girl',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4
      },{
        author: 'Aaron myspace',
        link: 'http://www.hutui6.com/data/out/200/68563005-travel-wallpapers.jpg',
        description: 'Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 5
      },{
        author: 'Drake',
        link: 'http://cdn.wallpapersafari.com/28/32/mEncpx.jpg',
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
