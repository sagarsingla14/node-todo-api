const mongoose = require('mongoose');
const {mongodb , ObjectID} = require('mongodb');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
