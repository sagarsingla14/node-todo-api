const mongoose = require('mongoose');

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

module.exports = {Todo};
