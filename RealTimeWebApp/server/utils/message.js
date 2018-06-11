var moment = require('moment');
 

function generateMessage = (from, text) => {
    var dtVal = moment.valueOf()
    
    return {
        from,
        text,
        createAt: dtVal
    };
};


function generateLocationMessage =(from, lat, long) =>{
    var link = 'https://www.google.com/maps?q=${lat},${long}';    
    var dtVal = moment.valueOf()

    return {
        from,
        url: link,
        createAt: dtVal
    };
};

module.exports = {generateMessage,generateLocationMessage};
