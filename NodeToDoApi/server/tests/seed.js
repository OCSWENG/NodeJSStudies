const {ObjectID}  = require('mongoose');
var {mongoose,db} = require('../mongoose');
var {Todo,User} = require('../../schema');
const jwt = require ('jsonwebtoken');

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();

const dummyUsers = [{
    _id: user1Id,
    email: 'someidentifier@yahoo.com',
    password: 'user1Pass2',
    tokens: [{
        access: 'auth',
        // seek generateAuthToken
        token: jwt.sign({_id: user1Id, access: 'auth'},'abc123').toString()
    }]
    
    },{
        _id: user2Id,
        email: 'someidentifier@gmail.com',
        password: 'user2Pass2',
        tokens: [{
            access: 'auth',
            // seek generateAuthToken
            token: jwt.sign({_id: user2Id, access: 'auth'},'abc123').toString()
        }]
}];

const dummyTodos = [{
    _id: mongoose.Types.ObjectId(),
    text: "First Test TODo"        
    }, {
        _id: mongoose.Types.ObjectId(),
        text: "2nd Test TODo",
        completedAt: 123
}];

const populateTodos = (done) => {
    Todo.remove({}).then( () => {
        return Todo.insertMany(dummyTodos);
    }).then( ()=> {done();});
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(dummyUsers[0]).save();
    var userTwo = new User(dummyUsers[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
};

module.exports = {dummyTodos, populateTodos, dummyUsers, populateUsers};
