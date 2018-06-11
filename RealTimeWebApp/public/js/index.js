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


socket.on('newLocationMessage', function(message){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>');
    
    li.text('${message.from}: ');
    a.attr('href', message.url);
    li.append(a);
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


var locationBtn = jQuery('#send-location');
locationBtn.on('click',function(){
   if(!navigator.geolocation) {
       return alert("GeoLocation is not Avialable");
   }
    
    // success , failure
    navigator.geolocation.getCurrentPosition(
        function(){
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
    },                                    
        function(){
        alert('Unable to retrieve Location');
    });    
    
});
