var moment = require('moment');

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
    var formatTime = moment(message.createdAt).format('h:mm a'); 
    
    var li = jQuery('<li></li>');
    li.text('${message.from} ${formatTime}: ${message.text}');
    jQuery('#messages').append(li);
    
});


socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    var formatTime = moment(message.createdAt).format('h:mm a'); 

    li.text('${message.from} ${formatTime}: ');
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);
});

var msgTextBox = jQuery('[name=message]');

jQuery('#message-form').on('submit', function(e) {
    // this is stop sending data on the URI
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: msgTextBox.val()        
    }, function () {
        
        msgTextBox.val('');
    });
});


var locationBtn = jQuery('#send-location');
locationBtn.on('click',function(){
   if(!navigator.geolocation) {
       return alert("GeoLocation is not Avialable");
   }
    
    locationBtn.attr('disabled','disabled').text('sending location ....');
    
    // success , failure
    navigator.geolocation.getCurrentPosition(
        function(){
            locationBtn.removeAttr('disabled').text('Send Location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });            
    },                                    
        function(){
            locationBtn.removeAttr('disabled').text('Send Location');
            alert('Unable to retrieve Location');
    });    
    
});
