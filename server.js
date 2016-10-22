const express = require('express');
const app = express();
const CONFIG = require('./config/config.json');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const pug = require('pug');
const route = require('./routes/gallery.js');
const methodOverride = require('method-override');
const db = require('./models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = "hello";

app.set('view engine', 'pug');
app.set('views', './templates');

app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  store: new RedisStore(),
  secret: CONFIG.secret,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride((req, res) => {
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   var method = req.body._method;
   delete req.body._method;
   return method;
 }
}));

const User = db.User;
const Photo = db.Photo;

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
};

passport.use(new LocalStrategy((username, password, done) =>  {
  console.log("username",username)
  User.findOne({
    where:{
    username:username
    }
  })
  .then((user) => {
    const passwordsMatch = bcrypt.compareSync(password, user.password);

    const isAuthenticated = (username === user.username && passwordsMatch);
    if(isAuthenticated){
      return done(null, user);
    } else {
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



app.get('/gallery',isAuthenticated,(req,res) => {
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
});

app.post('/gallery/new', (req,res) => {
  console.log('req.body********',req.body),
  Photo.create({
    userId: req.user.id,
    author: req.body.author,
    link: req.body.link,
    description: req.body.description
  })
  .then((data) => {
  res.redirect("/gallery");
  })
  .catch((err) => {
    console.error('error');
  });
});

app.get('/gallery/new', isAuthenticated,(req,res) => {
  res.render('new',{
  });
});

app.put('/gallery/:id', owner,(req,res)=>{
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
    });

});
app.post('/gallery', (req,res) => {
  Photo.create({
    author:req.body.author,
    link:req.body.link,
    description:req.body.description
  });
});

app.get('/gallery/:id/edit', isAuthenticated, owner,(req,res)=>{
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

app.get('/gallery/myPhotos', isAuthenticated, (req,res)=>{
  Photo.findAll({
    where:{
      userId:req.user.id
    }
  })
  .then(userPhotos => {
    res.render("userGallery",{
      userPhotos
    })
  })
  .catch((err) => {
    console.error('error');
  });
});


app.delete('/gallery/:id',(req,res) => {
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


app.get('/', (req,res) => {
  res.render('login');
});

app.post('/', passport.authenticate('local',{
  successRedirect:'/gallery',
  failureRedirect:'/'
}));

app.get('/create', (req,res) => {
  res.render('create');
});



app.post('/create', (req,res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    console.log("salt",salt)
    bcrypt.hash( req.body.password, salt, (err, hash) => {
      User.create({
        username: req.body.username,
        password: hash
      })
      .then((data) => {
      })
      .catch((err) => {
        console.error('error');
      });
    });
  })
  res.redirect('/');
})

app.get('/gallery', isAuthenticated, (req,res) => {
  res.render('index');
});

app.get('/logout',(req,res) => {
  req.logout();
  res.redirect('/');
});

app.listen(3000,() => {
  console.log('server started');
  db.sequelize.sync();
});