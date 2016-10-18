const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', './views');
var db = require('./models');
const User = db.User;
const Photo = db.Photo;

app.get('/gallery', (req,res) => {
  Photo.findAll()
  .then((data) => {
    res.render('index',{data});
  });
});

app.post('/gallery/new', (req,res) => {
  Photo.create({
    title:req.body.title,
    author:req.body.author,
    link:req.body.link,
    description:req.body.description
  })
  .then((data) => {
    res.json({success:true});
  });
});



//postman stuff
app.post('/gallery', (req,res)=>{

})

app.put('/gallery/:id', (req,res)=>{

})


//edit page
app.get('/gallery/:id/edit',(req,res)=>{

})

//get one specificially (detail page)
app.get('/gallery/:id', (req,res)=>{
  User.findById(req.params.id)
  .then((users) => {
    res.json(users);
  });
})

//delete one specificially
app.delete('/gallery:id',(req,res)=>{
 User.findById(req.params.id);
    user.destroy()
 .then(user => {
  })
 .then(done => {
    res.json({success:true});
 });
});


app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});