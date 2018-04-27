
var assert = require('assert');
const expect = require('expect');

var utils = require('../utils/utils')
describe('UTILS', ()=> {
    describe ('ADDER', () => {
    it('should return 5 when the values are 4 and 1', () => {
        assert.equal(utils.add(4,1),5);
    });

    it('should return 3 when the values are 4 and -1', () => {
        assert.equal(utils.add(4,-1),3);
    });
  
    it('should return 4.25 when the values are 4 and .25', () => {
        var result = utils.add(4, 0.25);
        expect(result).toBe(4.25);
    });
    
    it('should return -9 when the values are -4 and -5', () => {
        assert.equal(utils.add(-4, -5),-9);
    });
        

    describe ('ASYNC_ADD',  () => {
       it ( ' It shoud async two numbers ', async () => {
           const sum = await utils.asyncAdd(4,4);
           assert.equal(sum,8);
          });
    });
            
    });
           
    it ('Should expect Index[1] equal to 3 ', () => {
        var value = [2,3,4];
        
        assert.equal(value.indexOf(3), 1);
    });
    
});



