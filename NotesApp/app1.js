const os = require('os');
const fs = require('fs');
const _ = require('lodash');
const yargs = require ('yargs');
var notes = require('./notes.js');

const argv = yargs.argv;

const module1 = require('./module1')

var resultOutput = (result ,action,action2, title, body)=> {
    var resultAct = action;
    if(result == false) {
        resultAct = action2;
    }
    console.log(`Note:  ${title} , ${body} `, resultAct);
};



var command = argv._[0];
console.log('Command yargs: ', argv);

if (command === "add"){
    var result = notes.addNote(argv.title,argv.body);
    var action = 'added';
    var action2 = 'not added';
    resultOutput(result,action, action2, argv.title, argv.body);
    
} else if (command === 'list'){
    notes.getAll();
}else if (command === "read") {
    var result = notes.getNote(argv.title);
    console.log("Reading ", argv.title, " .... ", result)
    
}else if (command === "remove") {
    var result =  notes.removeNote(argv.title);
    var action = "removed";
    var action2 = "not removed";
    resultOutput(result,action, action2, argv.title, argv.body);
}else {
    console.log('Command not recognized');
}

