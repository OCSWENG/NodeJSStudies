// request a client to server for a websocket
var socket = io();
socket.on('connect',function ( ) {
    console.log('Connected to server');   
    socket.emit('createMessage', {
        from: 'someName2@example.com',
        text: 'blah blah'
    });
});

socket.on('disconnect', function ( ) {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);
});


