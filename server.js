const express = require('express');
const app = express();
const CONFIG = require('./config/config.json');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const pug = require('pug');
const methodOverride = require('method-override');

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride((req, res) => {
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   var method = req.body._method;
   delete req.body._method;
   return method;
 }
}));

const db = require('./models');
const User = db.User;
const Photo = db.Photo;

const isAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()){
    return res.redirect('/login');
  }
  return next();
};

app.get('/gallery', isAuthenticated,(req,res) => {
  Photo.findAll()
  .then((data) => {
    let one = data.slice(data.length-1)[0];
    res.render('index',{
      data,
      one
    });
  });
});

app.post('/gallery/new', (req,res) => {
  Photo.create({
    author:req.body.author,
    link:req.body.link,
    description:req.body.description
  })
  .then((data) => {
   res.render('new',{
      data
    });
  });
});

app.get('/gallery/new', /*isAuthenticated,*/(req,res) => {
  res.render('new',{
      });
});

app.post('/gallery', (req,res) => {
  Photo.create({
    author:req.body.author,
    link:req.body.link,
    description:req.body.description
  });
});

app.get('/gallery/:id/edit', isAuthenticated,(req,res)=>{
  Photo.findById(req.params.id)
  .then((data) => {
    res.render('edit', {
      data: data.dataValues
    });
  });
});

app.post('/gallery/:id/edit',(req,res)=>{
  Photo.findById(req.params.id)
  .then((data) => {
    data.update({
      author:req.body.author,
      link:req.body.link,
      description:req.body.description
    });
  });
});

app.delete('/gallery/:id',(req,res) => {
  Photo.destroy({
    where: {
      id: req.params.id
    }
  })
   .then(data => {
      res.json({success:true});
    });
});

passport.use(new LocalStrategy((username, password, done) =>  {
  User.findOne({
    where:{
    username:username
    }
  })
  .then(user => {
  const isAuthenticated = (username === user.username && password === user.password);
    if(isAuthenticated){
      console.log("found user")
      return done(null, user);
    } else {
      console.log("didnt find user")
      return done(null, false);
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

app.get('/login', (req,res) => {
  res.render('login');
});

app.post('/login', passport.authenticate('local',{
  successRedirect:'/gallery',
  failureRedirect:'/login'
}));


app.post('/gallery/new', (req,res) => {
  User.create({
    username:req.body.username,
    password:req.body.password,
  })
  .then((data) => {
  });
});

app.get('/create', (req,res) => {
  res.render('create');
});

app.post('/create',(req,res) => {
  User.create({
    username: req.body.username,
    password: req.body.password
  })
  .then((data) => {
  });
});

app.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/login');
});

app.listen(3000, () => {
  console.log('server started');
  db.sequelize.sync();

});