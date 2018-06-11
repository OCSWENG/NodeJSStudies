var expect = require('expect');
var {generateMessage} = require('./message');


describe ('generateMessage', () => {
    it('should generate correct message object', () =>{
        var from = 'identity@example.com';
        var text = 'this is a text message';
        var res = generateMessage(from,text);
        
        expect(res.createdAt).toBe('number');
        expect(res).toInclude ({
           from: from,
           text: text
        }); 
    });
});

describe('generateLocationMessage',()=>{
    it('should generate a correct location object', () =>{
        
        var from = 'Admin';
        var lat = 1;
        var long =1;
        var url = 'https://www.google.com/maps?q=1,1';
        var res = generateLocationMessage(from,lat,long);
        expect(res.createdAt).toBe('number');
        expect(res).toInclude({from,url});
    });
});

