const {MongoClient , ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp'  , (err , client) => {
  if(err){
    return console.log();
  }
  console.log('Successfully Connected!! ');

  const db = client.db('TodoApp');

  // Special Parameters are used for update commands $set : {}
  db.collection('Users').findOneAndUpdate({Age : 2} , {
    $set : {
      Name : 'Sagar Singla'
    }
  }, {
      returnOrignal : false
    }
  ).then((result) => {
    console.log(result);
  });
});
