const sinon = require('sinon');
//http://sinonjs.org/releases/v4.5.0/spies/
var assert = require('assert');
const chai = require("chai");
const expect = chai.expect;
const app = require('./app');

describe('SPY_App', () => {
    it('Should call user with user object', () => {
        var email = 'someID@example.com';
        var password = '123abc';
        var stub = sinon.spy(app.handleSignup);
        stub(email,password);
        
        sinon.assert.calledOnce(stub);
        expect(stub.calledWith(email,password));
        
    });
});