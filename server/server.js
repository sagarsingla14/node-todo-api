var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

const port = process.env.PORT || 3000;

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
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }, (e) => {
    res.status(404).send();
  });
});


app.listen(port , () => {
  console.log('Started on port '+ port);
});

module.exports = {
  app
}
