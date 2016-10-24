'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('Photos', [{
        author: 'Bradah Ray Ray',
        link: 'http://i.imgur.com/xtcghTT.jpg',
        description: 'Beautiful lake and mountains and trees',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },{
        author: 'Joe Joe Binks',
        link: 'http://i.imgur.com/Xlo6xmZ.jpg',
        description: 'Tropical rainforest in the middle of Kalihi Valley',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },{
        author: 'Aa-ron',
        link: 'http://i.imgur.com/xZumQxb.jpg',
        description: 'US side of Niagra Falls, beautiful view of toronto',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3
      },{
        author: 'bbchoe',
        link: 'http://tong.visitkorea.or.kr/img/vk/enu/cms/content/59/1976359_1_55.jpg',
        description: 'Visit Korea during the winter time to snowboard and ski',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4
      },{
        author: 'Jaypee',
        link: 'http://www.hutui6.com/data/out/200/68563005-travel-wallpapers.jpg',
        description: 'Island resort secluded from all the bullshit',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 5
      },{
        author: 'rcharzard',
        link: 'http://cdn.wallpapersafari.com/28/32/mEncpx.jpg',
        description: 'River walk during the evening time in a european town',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      }], {});

  },

  down: function (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Photos', null, {});
  }
};
