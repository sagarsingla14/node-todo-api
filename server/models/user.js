const mongoose = require('mongoose');

// Added Validators and Defaults
var User = mongoose.model('User', {
  email : {
    type : String,
    required : true,
    trim : true,
    minlemgth : 1
  }
});

module.exports = {User};
