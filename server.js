var express = require('express');
const bodyParser = require('body-parser');
var app = express();
const pug = require('pug');
//set template engine to use Pug
app.set('view engine','pug');

//tell express where our template files live
app.set('views','./templates');



app.use(bodyParser.urlencoded({extended:true}));
var db = require('./models');
const User = db.User;
const Photo = db.Photo;

// app.get('/gallery', (req,res) => {
//   User.findAll()
//   .then((users) => {
//     res.json(users);
//   });
// })
app.get('/gallery',(req,res)=>{
  Photo.findAll
  res.render('index',{
    page: 'home'
  });
})

app.get('/gallery/:id', (req,res)=>{
  User.findById(req.params.id)
  .then((users) => {
    res.json(users);
  });
})


app.post('/gallery/new', (req,res) => {
  User.create({ author:req.body.author,link:req.body.link, description:req.body.description})
  .then((data) => {
    res.json(data);
  });
});
app.get('gallery/new',(req,res)=>{
  res.render('new',{
    page: 'home'
  });
})
app.post('/gallery', (req,res)=>{

})

app.get('/gallery/:id/edit',(req,res)=>{

})

app.put('/users/:id', (req,res)=>{

})

app.delete('/users:id',(req,res)=>{
 User.findById(req.params.id)
 .then(done => {
    res.json({success:true});
 });
});


app.post ('/pictures', (req,res) => {
  Photo.create({title: req.body.title})
  .then((data) => {
    res.json(data);
  });
});

app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});