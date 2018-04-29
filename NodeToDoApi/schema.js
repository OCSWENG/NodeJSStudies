var mongoose = require('mongoose');
var todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
     completed: {
        type: Boolean,
         default: false
    },
    completedAt: {
        type: Number,
        default: null
    } 
});

// email, password, user
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: Number,
        required: true,
        minlength: 8
    }
});

module.exports.todoSchema = todoSchema;
module.exports.userSchema = userSchema;