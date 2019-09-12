const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to mongoDB server');
  }
  console.log('Connected Successfully to Mongo Server');
  const db = client.db('TodoApp');

  // Count Function Counts the Docs in the Current Database
  console.log('Counting Docs ');
  db.collection('Users').find().count().then((count) => {
    console.log(count);
  } , (err) => {
    console.log('Unable to Fetch the data');
  });
  client.close();
  // toArray parse data into Object of Arrays

  db.collection('Users').find({
    Age : 20
  }).toArray().then((docs) => {
    console.log(docs);
  } , (err) => {
    console.log('Unable to Fetch the data');
  });

  db.collection('Users').find({
    Name : 'Sagar Singla'
  }).toArray().then((docs) => {
    console.log(docs);
  } , (err) => {
    console.log('Unable to Fetch the data');
  });
  client.close();
});
