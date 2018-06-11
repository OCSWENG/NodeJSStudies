const path = require('path');

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

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
 
    socket.emit('newMessage',
                generateMessage('Admin','Welcome to chatterBox'); 
 
    socket.broadcast.emit('newMessage',
                generateMessage('Admin',
                'User X has joined');    
    );

    socket.on('createMessage', (message,callback)=>{
        
        console.log('createMessage : ${message}'); 
        // emit to all those who subscribed
        // to every connection
        io.emit('newMessage',
                generateMessage(message.from,
                                message.text);
        );
        callback();
    );
        
        // everybody except this socket
//        socket.broadcast.emit('newMessage',{
//            from: message.from,
//            text: message.text,
//            createdAt: new Date().getTime()
//        });        
    });
    
    socket.on('createLocationMessage', (coords) => {
       io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude));
    });
    
    socket.on('disconnect', (socket) => {
        console.log('Client disconnected');
    });    
});


server.listen(port, () => {
    console.log('Server is up on port: ${port}');
});




