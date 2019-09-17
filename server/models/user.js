const mongoose = require('mongoose');
const validator = require('validator');

// Added Validators and Defaults
var User = mongoose.model('User', {
  email : {
    type : String,
    required : true,
    trim : true,
    minlemgth : 1,
    unique : true,
    validate : {
      validator : (value) => {
        return validator.isEmail(value);
      } ,
      message: 'Not valid email'
    }
  } ,
  password : {
    type : String ,
    required : true,
    minlength : 6
  } ,
  tokens : [{
    access : {
      type : String
    },
    token : {
      type : String
    }
  }]
});

module.exports = {User};
