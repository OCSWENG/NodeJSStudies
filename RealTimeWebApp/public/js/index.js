var moment = require('moment');

// request a client to server for a websocket
var socket = io();


function scrollToBottom ( ) {
    // Selector
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    
    // Height
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight;
    
    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
       messages.scrollTop(scrollHeight);
    }
}


socket.on('connect',function ( ) {
    console.log('Connected to server');   

});

socket.on('disconnect', function ( ) {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    var formatTime = moment(message.createdAt).format('h:mm a'); 
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
        text: message.text,
        from: message.from,
        createdAt: formatTime 
    });
    
    jQuery('#messages').append(html);
    scrollToBottom();
});


socket.on('newLocationMessage', function(message){    
    var formatTime = moment(message.createdAt).format('h:mm a'); 
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        from: message.from,
        createdAt: formatTime,
        url: message.url
    });
    
    jQuery('#messages').append(html);
    scrollToBottom();
    
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
