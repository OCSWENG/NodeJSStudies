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
      var text = 'TeSt POST ToDo TeXt';
       
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
               done();
           }).catch((e) => done(e));
       });
   }); 
    
       
    it('should fail to create a new todo', (done) => {
      var text = 'TeSt POST ToDo TeXt';
       
       request(app)
       .post('/todos')
       .send({})
       .expect(400)
       .end((err,res)=> {
           if(err) {
               return done(err);
           }
           
           Todo.find().then((todos) => {
               expect(todos.length).toBe(0);
               done();
           }).catch((e) => done(e));
       });
   }); 
});