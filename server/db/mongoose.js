const mongoose = require('mongoose');
const {mongodb , ObjectID} = require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect('https://frozen-crag-77870.herokuapp.com/' || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
