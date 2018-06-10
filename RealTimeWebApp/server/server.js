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
        
    socket.on('createMessage', (message)=>{
       console.log('createMessage : ${message}'); 
        
        socket.emit('newMessage',{
            from: 'Admin',
            text: 'Welcome to chatterBox',
            createdAt: new Date().getTime()            
        });
        
        socket.broadcast.emit('newMessage',{
            from: 'Admin',
            text: 'User X has joined',
            createdAt: new Date().getTime()            
        });
        
        // emit to all those who subscribed
        // to every connection
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime();
        });
        
        // everybody except this socket
//        socket.broadcast.emit('newMessage',{
//            from: message.from,
//            text: message.text,
//            createdAt: new Date().getTime()
//        });        
    });
    
    socket.on('disconnect', (socket) => {
        console.log('Client disconnected');
    });    
});


server.listen(port, () => {
    console.log('Server is up on port: ${port}');
});




