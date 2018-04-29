const request = require('supertest');
const expect = require('expect');
const {ObjectID}  = require('mongoose');
const {app} = require('../server');
var {todoSchema, userSchema} = require('../../schema');
var {mongoose,db} = require('../mongoose');

var Todo = mongoose.model('Todo', todoSchema);

const dummyTodos = [{
    _id: mongoose.Types.ObjectId(),
    text: "First Test TODo"        
    }, {
        _id: mongoose.Types.ObjectId(),
        text: "2nd Test TODo"        
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(dummyTodos);
    }).then(()=> {done();});
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
           
           Todo.find({text}).then((todos) => {
               expect(todos.length).toBe(1);
               expect(todos[0].text).toBe(text);
               console.log(JSON.stringify(todos, undefined,2));
               done();
           }).catch((e) => done(e));
       });
   }); 
    
       
    it('should fail to create a new todo', (done) => {       
       request(app)
       .post('/todos')
       .send({})
       .expect(400)
       .end((err,res)=> {
           if(err) {
               return done(err);
           }
           
           Todo.find().then((todos) => {
               expect(todos.length).toBe(2);
               done();
           }).catch((e) => done(e));
       });
   }); 
});

describe('GET /todos', () => {
    it('should list all todo', (done) => { 
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    });
});

describe('GET /todos/ID', () => {
    it('should get a Todo using a valid ID', (done) =>{
        request(app)
        .get(`/todos/${dummyTodos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(dummyTodos[0].text);
        }).end(done); 
    });
    
    it('should return a 404 if todo not found', (done) =>{
        request(app)
        .get(`/todos/12345678`)
        .expect(404)
        .end(done);
    });
    

    it('should return a 404 for non object ids ', (done) =>{
        //todos/123
        request(app)
        .get(`/todos/alphabet`)
        .expect(404)
        .end(done);
    });
});


describe('DELETE /todos/ID', () => {
    it('should remove a todo', (done) => {
        var id = dummyTodos[0]._id.toHexString();
        request(app)
        .delete(`/todos/${id}`)
        .expect(200)
        .expect((res) => {   
            expect(res.body.todo._id).toBe(id);
        }).end((err,res) => {
            if(err) {
                return done(err);
            }
            // Query Database using FindByID
            Todo.findById(id).then((todo)=>{
               expect(todo).toBeNull();
               done();
            }).catch((e) => {done(e);});
        });  
    });

    it('should return 404 if todo not found', (done) => {
        var id = mongoose.Types.ObjectId();
        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end((err,res) => {
            if(err) {
                return done(err);
            }
            done();
        }); 
    });
    

    it('should return 404 if objectID is invalid', (done) => {
        request(app)
        .delete(`/todos/alphabet`)
        .expect(404)
        .end(done);
    });
});