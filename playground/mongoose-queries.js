const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {ObjectID} = require('mongodb');

var id = '5d7b9c40d86fa20a7424d1e9';

if(!ObjectID.isValid(id)){
  return console.log('Id not valid');
}

Todo.find({
  _id : id
}).then((todo) => {
  console.log(todo);
});

Todo.findOne({
  _id : id
}).then((todo) => {
  console.log(todo);
});

Todo.findById(id).then((todo) => {
  if(!todo){
    return console.log('Id not found');
  }
  console.log(todo);
}).catch((e) => console.log(e));
