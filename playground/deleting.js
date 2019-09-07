const {MongoClient, ObjectID} = require('mongoDB');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if(err){
     return console.log('Server Not connected');
  }
  console.log('Server Connected Successfully !!');

  const db = client.db('TodoApp');
  db.collection('Users').deleteMany({
    Name : 'Sagar Singla'
  }).then((result) => {
    console.log(result);
  });
  
});
