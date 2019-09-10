const mongoose = require('mongoose');
const {mongodb , ObjectID} = require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');


var Todo = mongoose.model('Todo' , {
  text : {
    type : String ,
    required : true
  } ,
  completed : {
    type : Boolean,
    Default : false
  } ,
  completedAt : {
    type : Number ,
    Default : null
  }
});

var newTodo = new Todo({
  text : 'Cook Dinner',
  completed : false,
  completedAt : 1
});

newTodo.save().then((docs) => {
  console.log(JSON.stringify(docs));
}, (err) => {
  console.log('Unable to save ! ' , err);
});

// Added Validators and Defaults
var User = mongoose.model('User', {
  email : {
    type : String,
    required : true,
    trim : true,
    minlemgth : 1
  }
});

var user = new User({
  email : 'sagar@example.com'
});

user.save().then((docs) => {
  console.log(JSON.stringify(docs , undefined , 2));
},(err) => {
  console.log('Unable to Save', e);
});
