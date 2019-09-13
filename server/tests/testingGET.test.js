const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');

beforeEach((done) => {
  Todo.remove({});
  done();
});

describe('Testing /GET' , () => {
  it('Getting DataBase Properly' , (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(1);
        done();
      }).end(done);
      done();
  });
});
