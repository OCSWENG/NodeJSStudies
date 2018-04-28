var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ToDoApp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports.mongoose = mongoose;
module.exports.db = db;
