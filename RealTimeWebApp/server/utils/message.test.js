var expect = require('expect');
var {generateMessage} = require('./message');


describe ('generateMessage', () => {
    it('should generate correct message object', () =>{
        var from = 'identity@example.com';
        var text = 'this is a text message';
        var res = generateMessage(from,text);
        
        expect(message.createdAt).toBe('number');
        expect(message).toInclude ({
           from: from,
           text: text
        });
        
    });
    
});