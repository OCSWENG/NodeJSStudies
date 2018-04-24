const yargs = require('yargs');
const axios = require('axios');


const argv = yargs.options({
        a: {
            demand: true,
            alias:  'address',
            describe: 'The Address utilized in the weather application'
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


var encodeAddr = encodeURIComponent(argv.address);
var geoUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
const apiKey = '2a02b1c22ad9e32b97a2c591a32d7e5d';

axios.get(geoUrl).then((response) => {
        if(response.data.status === 'ZERO_RESULTS') { 
            throw new Error('Unable to find that address.');
        }

        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        var weatherUrl = `https://api.forecast.io/forecast/${apiKey}/${lat},${lng}`;
        return axios.get(weatherUrl);
    
    }).then( (response)  => {
        var temperature = response.data.currently.temperature;
        var apparentTemperature = response.data.currently.apparentTemperature;
        console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
    }).catch( (ex) => {
        if(ex.code === 'ENOTFOUND'){console.log('Unable to connect to API servers.');}
        else { console.log(ex.message);}
});