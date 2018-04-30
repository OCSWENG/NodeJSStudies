const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
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
        minlength: 1,
        unique: true,

        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    }, 
    password: {
            type: String,
            required: true,
            minlength: 8,   
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,    
            required: true
        }
    }]
});


userSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

userSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    
    // throw an error if anything goes wrong
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch(e) {
        return new Promise.reject();
    }
    
    return User.findOne ({
        _id: decoded._id,
        'tokens.token' : token,
        'tokens.access' : 'auth'
    });
};

var Todo = mongoose.model('Todo', todoSchema);
var User = mongoose.model('User', userSchema);

module.exports.todo = {Todo};
module.exports.user = {User};