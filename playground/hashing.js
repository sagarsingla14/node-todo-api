const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var text = 'Hey Sagar Here !! Please hash this message';
var hash = SHA256(text + 'secret').toString();

var data = {
  id : text
};
var token = {
  data : data,
  hash : SHA256(JSON.stringify(data) + 'secret').toString()
};

var finalResult = SHA256(JSON.stringify(token.data) + 'secret').toString();
if(finalResult === token.hash){
  console.log('Correct', finalResult);
}
else{
  console.log('Incorrect');
}

// jwt.sign
var token = jwt.sign(data , 'secret'); 
console.log(token);

var decode = jwt.verify(token, 'secret');
console.log(decode);
