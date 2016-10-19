const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const pug = require('pug');
const methodOverride = require('method-override');

app.set('view engine', 'pug');
app.set('views', './templates');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended:true}));

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

/*app.put('/gallery/:id', (req,res)=>{
  Photo.findById(req.params.id)
  .then((data) => {
    data.update({
      author:req.body.author,
      link:req.body.link,
      description:req.body.description
    });
  });
});*/

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