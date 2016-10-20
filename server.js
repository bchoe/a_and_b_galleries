const CONFIG = require('./config/config.json');
//PASSPORT's sole purpose is to authenticate request.
//const passport = require('passport');
//const LocalStrategy = require('passport-local').Strategy;
//const session = require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
const methodOverride = require('method-override');

app.set('view engine', 'pug');
app.set('views', './templates');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));

//sessions middleware for express

//attach express session as middleware and initialize secret
// app.use(session({
//   secret: CONFIG.SECRET,
//   resave: false,
//   saveUninitialized: true
// }));


//attach passport as middleware and initialize

// app.use(passport.initialize());

// //our app uses persistan login session
// // so we need to tell press and passport this to use the session middleware
// app.use(passport.session());

app.use(methodOverride(function(req, res){
 if (req.body && typeof req.body === 'object' && '_method' in req.body) {
   // look in urlencoded POST bodies and delete it
   var method = req.body._method
   delete req.body._method
   return method
 }
}));

const db = require('./models');
const User = db.User;
const Photo = db.Photo;


app.get('/gallery', (req,res) => {
  Photo.findAll()
  .then((data) => {
    let one = data.slice(data.length-1)[0];
    res.render('index',{
      data,
      one
    })
  });
});

  //finished.post gallery/new
app.post('/gallery/new', (req,res) => {
  Photo.create({
    //title:req.body.title,
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


//finished.howget gallery/new
app.get('/gallery/new',(req,res)=>{
  res.render('new',{
      });
});


app.post('/gallery', (req,res)=>{
  Photo.create({
    //title:req.body.title,
    author:req.body.author,
    link:req.body.link,
    description:req.body.description
  });
});



//edit page
app.get('/gallery/:id/edit',(req,res)=>{
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
    console.log(data);
      res.json({success:true});
    })

});


app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});




// authentication##########


// //use local strategy - this checks out database in
// //order to authenticate our users
// passport.use(new LocalStrategy((username, password, done)=>{
//   const {USERNAME, PASSWORD} = CONFIG.CREDENTIALS;

//   const isAuthenticated = (username === USERNAME && password === PASSWORD);

//   if(!isAuthenticated){// not authenticated
//     return done(null, false);// no error not credentials do not match
//   }



//     //were authenticated
//     //
//     const user = {
//       name: "aaron",
//       role: "admin",
//       favColor:'blue'
//     }
//     return done(null,user);
// }))

// //In order of persistant serssion to work- you must serialize
// //the user to the request and then deserialize subsequent requests
// passport.serializeUser((user,done)=>{
//   //user is passed in from local stragery
//   //user is attached to the req.user
//   return done(null,user)
// });

// passport.deserializeUser((user,done)=>{
//   return done(null,user);
// })

// const isAuthenticated = (req, res, next)=>{
//   if(!req.isAuthenticated()){
//     return res.redirect('/login');
//   }
//   return next();
// }

// app.get('/login', (req,res)=>{
//   res.render('login');
// })

// app.post('/login', passport.authenticate('local',{
//   successRedirect:'/secret',
//   failureRedirect:'/login'
// }))

// app.get('/secret', isAuthenticated, (req,res)=>{
//   res.render('secret');
// })

// app.get('/logout',(req,res)=>{
//   req.logout();
//   res.redirect('/login')
// })


// const server = app.listen(PORT,()=>{
//   console.log(`Server listening on ${PORT}`);

// });