const mongoose = require('mongoose');
const {mongodb , ObjectID} = require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


var Todo = mongoose.model('Todo' , {
  text : {
    type : String
  } ,
  completed : {
    type : Boolean
  } ,
  completedAt : {
    type : Number
  }
});

var newTodo = new Todo({
  text : 'Cook Dinner',
  completed : false,
  type : 1
});

newTodo.save().then((docs) => {
  console.log(JSON.stringify(docs));
}, (err) => {
  console.log('Unable to save ! ' , err);
});
