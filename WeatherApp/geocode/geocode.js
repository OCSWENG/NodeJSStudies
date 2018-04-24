const request = require('request');

var geoCodeAddress = (address, callback) => {
    var encodeAddress = encodeURIComponent(address);
    var urlVal = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
    
    request({
        url : urlVal,
        json: true
    }, (error, response, body)=> {
        if(error) {
            callback('No Response from Google Server');
        } else if(body.status === 'ZERO_RESULTS') {
            callback(`Unable to locate address ${encodeAddress}`);
        } else if(body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng 
            });
        }
    });
};


module.exports.geoCodeAddress = geoCodeAddress;