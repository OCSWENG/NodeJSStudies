var express = require('express');
var bodyParser = require('body-parser');
var {todoSchema, userSchema} = require('../schema');
var {mongoose,db} = require('./mongoose');

var Todo = mongoose.model('Todo', todoSchema);

var app = express();
app.use(bodyParser.json());

var url = '/todos';
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

app.get(url, (req,res) => {
    res.send('<h1>WELCOME</h1><p><b>THE BOLD STATEMENT</b></p>');
});

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