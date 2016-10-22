const express =require('express');
const pug = require('pug');
const gallery = express.Router();
const Photo = require('../models').Photo;
const User = require('../models').User;
const validate = require('./middleware.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const LocalStrategy = require('passport-local').Strategy;

//encryption
passport.use(new LocalStrategy((username, password, done) =>  {
  User.findOne({
    where:{
    username:username
    }
  })
  .then((user) => {
    if(user === null){

    } else {
    bcrypt.compare(password, user.dataValues.password, (err, res) => {
      if(err){
        console.error(err);
        return done(null, false);
      } else {
        return done(null, user);
      }
    });
    }
  })
  .catch(err => {
    return done('user not found', false);
  });
}));

passport.serializeUser((user, done) => {
  return done(null,user);
});

passport.deserializeUser((user,done) => {
  return done(null,user);
});

//login - homepage
gallery.route('/')
  .get((req,res) => {
    res.render('login');
  })
  .post(passport.authenticate('local',{
    successRedirect:'/gallery',
    failureRedirect:'/'
  }));

//create new user
gallery.route('/create')
  .get((req,res) => {
    res.render('create');
  })
  .post((req,res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      console.log("salt",salt);
      bcrypt.hash( req.body.password, salt, (err, hash) => {
        User.create({
        username: req.body.username,
        password: hash
        })
        .then((data) => {
          res.redirect('/success');
        })
        .catch((err) => {
        console.error('error');
        });
      });

  });
});

//access to all users signed in
gallery.route('/gallery')
  .get(validate.isAuthenticated,(req,res) => {
  Photo.findAll()
  .then((data) => {
    let one = data.slice(data.length-1)[0];
    res.render('index',{
      data,
      one
    });
  })
  .catch((err) => {
    console.error('error');
  });
})
  .post((req,res) => {
    Photo.create({
      author:req.body.author,
      link:req.body.link,
      description:req.body.description
    });
});

//post new photo
gallery.route('/gallery/new')
  .get(validate.isAuthenticated,(req,res) => {
    res.render('new',{
    });
  })
  .post((req,res) => {
    console.log('req.body********',req.body),
    Photo.create({
      userId: req.user.id,
      author: req.body.author,
      link: req.body.link,
      description: req.body.description
    })
    .then((data) => {
    res.redirect('/gallery');
    })
    .catch((err) => {
      console.error('error');
    });
});

//edits and deletes photos
gallery.route('/gallery/:id')
  .put(validate.owner,(req,res)=>{
    console.log('hit');
    Photo.findById(req.params.id)
      .then((one) => {
       res.redirect("/gallery");
        return one.update({
          id:req.params.id,
          author:req.body.author,
          link:req.body.link,
          description:req.body.description
        });
      })
      .then(() => {
      })
      .catch((err) => {
        console.error('error');
      })
  .delete((req,res) => {
    Photo.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(data => {
      res.redirect("/gallery");
      console.log(data);
        res.json({success:true});
    })
    .catch((err) => {
    console.error('error');
    });
  });
});

//???????
gallery.route('/gallery/:id/edit')
  .get(validate.isAuthenticated, validate.owner,(req,res)=>{
    Photo.findById(req.params.id)
    .then((data) => {
    console.log(req.user,data.dataValues);
      res.render('edit', {
        isOwner:req.user.user,
        photoId:parseInt(req.params.id),
        data: data.dataValues
      });
    })
    .catch((err) => {
      console.error('error');
    });
  });

//shows specificially what a user posted
gallery.route('/gallery/myPhotos')
  .get(validate.isAuthenticated, (req,res)=>{
  Photo.findAll({
    where:{
      userId:req.user.id
    }
  })
  .then(userPhotos => {
    res.render("userGallery",{
      userPhotos
    });
  })
  .catch((err) => {
    console.error('error');
  });
});

//user logs out
gallery.route('/logout')
  .get((req,res) => {
    req.logout();
    res.redirect('/');
  });

gallery.route('/success')
  .get((req,res) => {
    res.render('success');
  })

module.exports = gallery;