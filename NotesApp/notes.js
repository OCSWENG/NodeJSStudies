const fs = require('fs');
const _ = require('lodash');

/*module.exports.addNote = () => {
    console.log('addNote');
    return "New Note";
};*/

// Attempt to read file.  
var fetchNotes =  () => {
        try {
        var notesString = fs.readFileSync('./notes-data.json');
        return JSON.parse(notesString);
    } 
    catch (err) {
        return [];
    }   
};

// Write to the file
var saveNotes = (noteArray) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(noteArray));
};


var addNote = (title, body) => {
    // Initialize variables
    var noteArray = fetchNotes();
    var noteItem = {
        title,
        body
    };
   
    // look for duplicate title
    var duplicateNoteTitles = noteArray.filter((note) => {
        return note.title === title;        
    });
    
    // if no duplicate title add to the file.
    if ( duplicateNoteTitles.length == 0) {
        // Add to file
        noteArray.push(noteItem);
        saveNotes(noteArray);
        return true;
    }
    return false;
}


var getAll = () => {
    var noteArray = fetchNotes();
    if ( noteArray.length > 0) {
        _.forEach(noteArray, (item) =>{console.log(item);})
    }
    else {
        console.log("No  Notes found ");
    }
};

var getNote = (title) => {
    var notesArray = fetchNotes();
    var foundNote = _.find(notesArray, function (itm){ return _.isMatch(itm.title, title);});
    return foundNote;
} 


var removeNote = (title) => {
    var noteArray = fetchNotes();
    var result= false;
    var removeTitle = noteArray.filter((note) => {
        return !_.isMatch(note.title, title);        
    });
    
    saveNotes(removeTitle);
    
    if ( noteArray.length != removeTitle.length) {
        result = true;
    }
    return result;
};

module.exports = {
    addNote,
    getAll, 
    getNote,
    removeNote
};
