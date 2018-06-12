const path = require('path');

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const {isRealString} = require('./utils/validate');


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
 


    socket.on('join', (params,callback) =>{
        // params name and room
        // callback acknowledge 
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and Room name must be alphanumeric')            
        }
        
        socket.join(params.room);
        // socket.leave(params.room);
        // Target specific users
        // every connected user
        // io.emit 
        // sends every connected except the current user
        // socket.broadcast.emit
        // send to one user
        // socket.emit
        
        // io.emit() -> io.to('').emit()
        // socket.broadcast.to('').emit()
        
               
        socket.emit('newMessage',
                generateMessage('Admin','Welcome to chatterBox'); 
 
        socket.broadcast.to(params.room).emit('newMessage',
                generateMessage('Admin',
                '${params.name} has joined');    
    );
        
        callback();
    });
    
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




