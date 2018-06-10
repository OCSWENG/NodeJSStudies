const path = require('path');

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

const pathToPublic = path.join(__dirname, '..','/public');

var app = express();

var server = http.createServer(app);

app.use(express.static(pathToPublic));

// websocket server
var io = socketIO(server);
// listen for a new connection then do the following
io.on('connection', (socket) =>{
   console.log('new user connected');
        
    socket.emit('newMessage', {
        from : 'someName@example.com',
        text : 'blah blah blah',
        createAt: 123    
    });
    
    socket.on('createMessage', (message)=>{
       console.log('createMessage : ${message}'); 
    });
    
    socket.on('disconnect', (socket) => {
        console.log('Client disconnected');
    });    
});


server.listen(port, () => {
    console.log('Server is up on port: ${port}');
});




