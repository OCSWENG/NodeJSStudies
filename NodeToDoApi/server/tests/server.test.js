const request = require('supertest');
const expect = require('expect');

const {app} = require('../server');
var {todoSchema, userSchema} = require('../../schema');
var {mongoose,db} = require('../mongoose');

var Todo = mongoose.model('Todo', todoSchema);

beforeEach((done) => {
    Todo.remove({}).then(() => {
        done();
    });
});

describe('POST /todos', () => {
   it('should create a new todo', (done) => {
      setTimeout(done,0);
      var text = 'TEST POST ToDo TeXt';
       
       request(app)
       .post('/todos')
       .send({text})
       .expect(200)
       .expect((res) => {
           expect(res.body.text).toBe(text);
       })
       .end((err,res)=> {
           if(err) {
               return done(err);
           }
           
           Todo.find().then((todos) => {
               expect(todos.length).toBe(1);
               expect(todos[0].text).toBe(text);
               console.log(JSON.stringify(todos, undefined,2));
           }).catch((e) => done(e));
       });
   }); 
});