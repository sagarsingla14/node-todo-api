const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');
const validator = require('validator');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// Posting a todo into Database
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

// Getting all Todos to client
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
  if(! ObjectID.isValid(id)){
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

// Deletion using mongoose
app.delete('/todos/:id' , (req , res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((docs) => {
    if(!docs){
      return res.status(404).send();
    }
    res.send({docs});
  });
});

// Patch Route for updating
app.patch('/todos/:id' , (req , res) => {
  var id = req.params.id;
  var body = _.pick(req.body , ['text' , 'completed']);

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(body.completed && _.isBoolean(body.completed)) {
    body.completedAt = new Date().getTime();
  }
  else{
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id , {$set : body} , {new : true}).then((docs) => {
    if(! docs) {
      res.status(404).send();
    }
    res.send(docs);
  }).catch((e) => {
    return res.status(404).send();
  });
});

app.post('/users' , (req , res) => {

  var body = _.pick(req.body , ['email' , 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
      res.header('x-auth',token).send(user);
  }).catch((e) => {
    res.status(404).send(e);
  });
});

app.listen(3000 , () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
}
