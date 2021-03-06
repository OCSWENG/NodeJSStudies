const os = require('os');
const fs = require('fs');
const _ = require('lodash');
const yargs = require ('yargs');
var notes = require('./notes.js');

const titleOptions =  {
            describe: 'Title of Note',
            demand: true,
            alias: 't'
        };

const argv = yargs.command('add','Add new note', {
        title : titleOptions,
        body : {
            describe: 'Note contents',
            demand: true,
            alias: 'b'            
        }
    })
    .command('list','list notes')
    .command('read','read new note', {
        title : titleOptions
    })
    .command('remove','remove note', {
        title : titleOptions
    })
    .help()
    .argv;
var command = argv._[0];


const module1 = require('./module1')

var resultOutput = (result ,action,action2, title, body)=> {
    var resultAct = action;
    if(result == false) {
        resultAct = action2;
    }
    console.log(`Note:  ${title} , ${body} `, resultAct);
};



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

