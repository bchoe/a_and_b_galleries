'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('Photos', [{
        author: 'Hipster',
        link: 'https://s-media-cache-ak0.pinimg.com/736x/42/a5/e5/42a5e579b47812d968e9357c87d77166.jpg',
        description: 'not Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1
      },{
        author: 'Hawaii',
        link: 'http://www.astonhotels.com/assets/slides/690x380-Hawaii-Sunset.jpg',
        description: 'Drake Lover',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2
      },{
        author: 'tmblr',
        link: 'http://25.media.tumblr.com/tumblr_lel9ozv2Bo1qc9hbio1_500.jpg',
        description: 'Asian Hipster girl',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3
      },{
        author: 'azn',
        link: 'https://s-media-cache-ak0.pinimg.com/originals/28/fe/b6/28feb60cb5c858cf0240df7c0b19e834.jpg',
        description: 'My girl',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 4
      },{
        author: 'Aaron myspace',
        link: 'https://a2-images.myspacecdn.com/images01/123/681843da47f756dd2501f6764f0b10d1/300x300.jpg',
        description: 'Drake',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 5
      },{
        author: 'Drake',
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
