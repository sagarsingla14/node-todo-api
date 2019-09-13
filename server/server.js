var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req , res) => {
  var todo = new Todo({
    text : req.body.text,
    completed : req.body.completed,
    completedAt : req.body.completedAt
  });
  todo.save().then((docs) => {
    res.send(docs)
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos' , (req , res) => {
  Todo.find().then((docs) => {
    res.send({docs});
  } ,(e) => {
    res.status(400).send(e);
  });
});

// Getting An individual response

app.get('/todos/:id' , (req , res) => {
  var id = req.params.id;
  if(! ObjectId.isValid(id)){
    res.status(404).send();
    return console.log('Id not Valid');
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      res.status(404).send();
      return console.log('Id not found');
    }
    res.send({todo});
  }, (e) => {
    res.status(404).send();
  });
});


app.listen(3000 , () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
}
