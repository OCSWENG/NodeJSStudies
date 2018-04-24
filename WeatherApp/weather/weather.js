const request = require('request');
 const apiKey = '2a02b1c22ad9e32b97a2c591a32d7e5d';

var getWeather = (lat, lng, callback) => {
    var urlVal = `https://api.forecast.io/forecast/${apiKey}/${lat},${lng}`;

    request({
        url : urlVal,
        json : true        
    },(error,response,body) => {
        if(error) {
            callback('Forecast.io server connection is down');
        }
        else if (response.statusCode ===400) {
            callback('Unable to fetch weather.');
        }
        else if (response.statusCode === 200) {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        }
    });
};


module.exports.getWeather = getWeather;
