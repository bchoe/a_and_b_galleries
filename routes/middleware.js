const Photo = require('../models').Photo;
const User = require('../models').User;
const bcrypt = require('bcrypt');

function owner(req,res,next){
  User.findOne({
    where: {
      username: req.user.username
    }
  })
  .then(user => {
    console.log('req user',req.user);
    Photo.findById(req.params.id)
      .then(photo => {
        if(photo.userId === user.id) {
          next();
        } else {
          res.json({
            success: false,
            error: 'You are not the owner of this Photo'
          })
        }
      })
      .catch(err => {
        res.json({
          success: false,
          error: err
        })
      });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err
      });
    });
};

function isAuthenticated(req, res, next){
  if(!req.isAuthenticated()){
    return res.redirect('/');
  }
  return next();
}

module.exports = {
  owner,
  isAuthenticated
};