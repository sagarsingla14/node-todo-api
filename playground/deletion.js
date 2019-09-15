// Deletion in mongoose

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

const {ObjectID} = require('mongodb');

Todo.remove({}).then((docs) => {
  console.log(docs);
});

Todo.findOneAndRemove({_id : '5d7e96ffc1c325015090473d'}).then((docs) => {
  console.log(docs);
});

Todo.findByIdAndRemove('5d7e96ffc1c325015090473d').then((docs) => {
  console.log(docs);
});
