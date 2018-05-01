const {ObjectID} = require('mongodb');
var express = require('express');
var bodyParser = require('body-parser');
var {todoSchema, userSchema} = require('../schema');
var {mongoose,db} = require('./mongoose');
const _ = require('lodash');
var {authenticate} = require('../middleware/authenticate');

// const crypto = require('crypto');

var {Todo,User} = require('../schema');

var app = express();
app.use(bodyParser.json());

var url = '/todos';

// POST a Todo Schema Object
app.post(url, (req,res) => {
   //console.log(req.body);
    var userEvent = new Todo ({
        text: req.body.text,
        completed: false
    });
    
    userEvent.save().then ( (doc) =>{
        res.send(doc);
    }, (err)=> {
       res.status(400).send(err);
    });
});

// POST USERS
var url2 = '/users';
//var emailString = 'somelabel@example.com'
//const hash = crypto.createHash('sha512');
//const password = '12#4afip:'
//hash.update(password);

app.post(url2, (req,res) => {
    var body = _.pick(req.body, ['email','password']);
    var user = new User(body); 
    
    user.save().then (() =>{
       return user.generateAuthToken();
    }).then( (token) => {
        // jwt token scheme not a standard header
        res.header('x-auth').send(user);        
    }).catch( (err)=> {
       res.status(400).send(err);
    });
});

// POST /users/login {email,password}

var url3 = url2+'/login';
app.post(url3, (req,res)=> { 
    // pick email password
    var body = _.pick(req.body, ['email','password']);
    // use POSTMAN to verify res.send(body);
    //userSchema.statics.findByCredentials = function(email, password){
 
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then( (token) => {
            res.header('x-auth',token).send(user); 
        });
    }).catch((e) => {
       res.status(400).send();      
    });
});

/**********************/
// LIST RESOURCES
app.get(url, (req,res) => {
   Todo.find().then((todos) => {
       res.send({todos});
   }, (err)=>{
       res.status(400).send(err);
   });
});


/**********************/

// GET /todos/123456
var urlParam = url +'/:id';
app.get(urlParam, (req,res) => {
   var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send("Objectid is not valid");
    }
    
    Todo.findById(id).then((todo) => {
        console.log("Find by id returned : " + todo);
        if(!todo){
            return res.status(404).send("Todo Find by Id Not Found");
    }
        res.status(200).send({todo});
        
    }).catch( (e) => {
        res.status(400).send(e);
    });
});


//PRIVATE ROUTE
app.get('/users/me', authenticate, (req,res) => {
       res.send(req.user);
});

/**********************/

// Delete by ID
app.delete(urlParam , (req,res)=>{
    // get ID
    var id = req.params.id;
    
    // Validate ID
    if(!ObjectID.isValid(id)) {
        return res.status(404).send("Objectid is not valid");
    }
    
    // todo remove by id
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo){
            return res.status(404).send("No TODO");
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
});

/**********************/

// UPDATE
app.patch(urlParam, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } 
  else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id,
                         {$set: body}, 
                         {new: true})
      .then((todo) => {
        if (!todo) {
          return res.status(404).send();
        }

        res.send({todo});
        }).catch((e) => {
            res.status(400).send();
        });
});

// Kick off the server

app.listen(3000, () => {
    console.log('Started on port 3000');    
});

/*

db.once('open', function() {
    var Todo = mongoose.model('Todo', todoSchema);

    var userEvent = new Todo ({
        text: 'Prepare Lunch',
        completed: false
    });

    userEvent.save().then ( (doc) =>{
        console.log('Saved todo', doc)
    }, (err)=> {
        console.log("unable to insert Todo");
        console.log(err)
    });
}).then( () =>{
    mongoose.disconnect();
        
});
*/

module.exports = {app};