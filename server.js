var express = require('express');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
var db = require('./models');
const User = db.User;
const Task = db.Task;

app.post('/gallery/new', (req,res) => {
  User.create({username:req.body.username, author:req.body.author, description:req.body.description})
  .then((data) => {
    res.json(data);
  });
});

app.get('/gallery', (req,res) => {
  User.findAll()
  .then((users) => {
    res.json(users);
  });
});

app.post ('/pictures', (req,res) => {
  Task.create({title: req.body.title})
  .then((data) => {
    res.json(data);
  });
});

app.listen(3000, function() {
  console.log('server started');
  db.sequelize.sync();
});