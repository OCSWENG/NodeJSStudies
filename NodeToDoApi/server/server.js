var express = require('express');
var bodyParser = require('body-parser');
var {todoSchema, userSchema} = require('../schema');
var {mongoose,db} = require('./mongoose');

var Todo = mongoose.model('Todo', todoSchema);

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


// LIST RESOURCES
app.get(url, (req,res) => {
   Todo.find().then((todos) => {
       res.send({todos});
   }, (err)=>{
       res.status(400).send(err);
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