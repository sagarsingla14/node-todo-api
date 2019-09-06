// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


var {Age,name} = user;
console.log(name ,  Age);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err){
    return console.log('Unable to connect to mongoDB server');
  }

  const db = client.db('TodoApp');
  db.collection('Users').insertOne({
    Name : "Sagar Singla",
    Age : 19,
    Skills : "Sport Programming"
  },(err , result) =>{
    if(err){
      return console.log('Unable to insert into database');
    }
    console.log(JSON.stringify(result.ops,undefined,3));
    console.log(result.ops[0]._id.getTimestamp());
  });
  for(int i=0;i<10;i++){
    console.log(1);
  }
  client.close();
});











// var obj = new ObjectID();
// console.log(obj);
// var user = {
  //   name : "Sagar Singla",
  //   Age : 20
  // };



























// MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client) => {
  //   if(err){
    //     return console.log('Unable to connect Database server !!');
    //   }
    //   console.log('Connected To mongoDB Server Successfully');
    //
    //   const db = client.db('TodoApp');
    //   db.collection('Todos').insertOne({
      //     text : "Hello",
      //     Connected : false
      //   }, (err,result) =>{
        //     if(err){
          //       return console.log('Unable to insert todo !');
          //     }
          //
          //     console.log(JSON.stringify(result.ops, undefined,2));
          //   });
          //
          //   client.close();
          // });
