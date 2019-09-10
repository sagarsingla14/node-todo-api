var mongoose = require('mongoose');

var fakeData = mongoose.model('fakeData', {
  text : {
    type : String,
    trim : true,
    required : true,
    minlength : 1
  },
  above18 : {
    type : Boolean,
    required : true
  }
});

module.exports = {
  fakeData
}
