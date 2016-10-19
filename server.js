const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');

app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'pug');
app.set('views', './templates');
app.use(express.static('./public'));
var db = require('./models');
const User = db.User;
const Photo = db.Photo;


// finished.get galley
app.get('/gallery', (req,res) => {
  Photo.findAll()
  .then((data) => {
    let one = data.slice(data.length-1)[0];
    console.log("dataBOTO",data)
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
    })
  });
});


//finished.howget gallery/new
app.get('/gallery/new',(req,res)=>{
  res.render('new',{
      })
})


app.post('/gallery', (req,res)=>{

})

app.put('/gallery/:id', (req,res)=>{

})


//edit page
app.get('/gallery/:id/edit',(req,res)=>{
  Photo.findById(req.params.id)
  .then((data) => {
    console.log(data)
    res.render('edit',{
     data: data.dataValues
    })
  });
});

//get one specificially (detail page)
// app.get('/gallery/:id', (req,res)=>{
//   Photo.findById(req.params.id)
//   .then((data) => {
//     res.render('edit',{
//       data
//     })
//   });
// })

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