

function generateMessage = (from, text) => {
    return {
        from,
        text,
        createAt: new Date.getTime()
    };  
};


function generateLocationMessage =(from, lat, long) =>{
    var link = 'https://www.google.com/maps?q=${lat},${long}';    
    return {
        from,
        url: link,
        createAt: new Date.getTime()
    };
};

module.exports = {generateMessage,generateLocationMessage}
