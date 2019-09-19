const mongoose = require('mongoose');
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const validator = require('validator');

var UserSchema = new mongoose.Schema({
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

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id : user._id.toHexString() , access} , 'Secret').toString();
  console.log(token);
  user.tokens.push({access  ,token});

  return user.save().then(() => {
    return token;
  });
}

// Added Validators and Defaults
var User = mongoose.model('User', UserSchema);

module.exports = {User};
