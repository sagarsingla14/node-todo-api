var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');

var {fakeData} = require('./fakemodule');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/FakeData');

var app = express();
app.use(bodyParser.json());

app.post('/fake' , (req , res) => {
  var data = new fakeData({
    text :  req.body.text ,
    above18 : req.body.above18
  });

  data.save().then((docs) => {
    console.log(JSON.stringify(docs , undefined , 3));
  } ,(e) => {
    console.log(e);
  });
});

app.listen(3000 , () => {
  console.log('Connected to the server !!');
});
