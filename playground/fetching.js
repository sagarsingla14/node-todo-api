const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to mongoDB server');
  }
  console.log('Connected Successfully to Mongo Server');
  const db = client.db('TodoApp');
  db.collection('Users').find().toArray().then((docs) => {
    console.log(docs);
  } , (err) => {
    console.log('Unable to Fetch the data');
  });
  client.close();
});
