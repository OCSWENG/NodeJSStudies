const path = require('path');

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const pathToPublic = path.join(__dirname, '..','/public');

var app = express();

var server = http.createServer(app);


// websocket server
var io = socketIO(server);
// listen for a new connection then do the following
io.on('connection', (socket) =>{
   console.log('new user connected'); 
});

io.on('disconnect', (socket) => {
    console.log('Client disconnected');
});


app.use(express.static(pathToPublic));


server.listen(port, () => {
    console.log('Server is up on port: ${port}');
});




