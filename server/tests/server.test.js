const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');


var todos = [{
  _id : new ObjectID(),
  text : 'First test Todo'
},
{
  _id : new ObjectID(),
  text : 'Second test Todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  });
  done();
});

describe('POST /todos' , () => {
  it('Should create a new Todo' , (done) => {
    var text = 'Add it to the Postman';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err , res) => {
      if(err){
        return done(err);
      }
      Todo.find({text}).then((docs) => {
        expect(docs.length).toBe(1);
        expect(docs[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
    done();
  });

  it('Should not create a Node with invalid data' , (done) => {
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err , res) => {
      if(err) {
        return done(err);
      }
      Todo.find().then((docs) => {
        expect(docs.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
    done();
  });
});

describe('Testing /GET' , () => {
  it('Getting DataBase Properly' , (done) => {
    request(app)
    .get('/todos')
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(2);
      done();
    }).end();
    done();
  });
});

describe('GET /todos/:id' ,() => {
  var id = todos[0]._id.toHexString();
  it('Should return todo doc' , (done) => {
    request(app)
      .get('/todos/' + id)
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.text).toBe(todos[0].text);
        done();
      })
      .end();
      done();
  });


  it('Should return 404 if id is not Valid' , (done) => {
    request(app)
      .get('/todos/122abx')
      .expect(404)
      .end();
      done();
  });

  it('Should return 404 if todo is not found' , (done) => {
    id = new ObjectID();
    request(app)
      .get('/todos/' + id)
      .expect(404)
      .end();
      done();
  });
});


describe('Testing Delete' , () => {
  var id = todos[0]._id.toHexString();
  it('Should test Delete /todoid' , (done) => {
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(id);
      })
      .end((e , res) => {
        if(e){
          return done(e);
        }

        Todo.findById(id).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      });
      done();
  });

  id = new ObjectID().toHexString();
  it('If id is not found then error 404' , (done) => {
    request(app)
      .delete(`/todos/${id}`)
      .expect(404)
      .end();
      done();
  });

  it('Should test if id is not valid erorr 404' , (done) => {
    request(app)
      .delete('/todos/23112acsc')
      .expect(404)
      .end(done);
  });
});
