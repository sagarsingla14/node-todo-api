const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

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
        done(err);
      }
      Todo.find().then((docs) => {
        expect(docs.length).toBe(1);
        expect(docs[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
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
        expect(docs.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
  });
});
