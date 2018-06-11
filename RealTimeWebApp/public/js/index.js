// request a client to server for a websocket
var socket = io();
socket.on('connect',function ( ) {
    console.log('Connected to server');   

});

socket.on('disconnect', function ( ) {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message){
    console.log('New Message', message);
    var li = jQuery('<li></li>');
    li.text('${message.from}: ${message.text}');
    jQuery('#messages').append(li);
    
});

jQuery('#message-form').on('submit', function(e) {
    // this is stop sending data on the URI
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name-message]').val()        
    }, function () {
        
    });
});
