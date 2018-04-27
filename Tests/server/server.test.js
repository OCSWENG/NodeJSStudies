
const request = require('supertest');
var assert = require('assert');

const app = require('./server').app;

describe ('WEBSERVER', () => {
it('should return hello world response', (done) => {
   request(app)
    .get('/')
    .expect(404)
    .expect((res) => {
        assert(res.body, "Page Not Found");  
   })
    .end(done);
});


it('should return user objects', (done) => {
   request(app)
    .get('/users')
    .expect(200)
    .expect((res) => {
       assert(res.body.length, 3);

       var testName = ['orange','apple','pear'];
       var testAge = [33,25,22];
       for (var i = 0; i < res.body.length; ++i) {
            assert(res.body[i].name, testName[i]);
            assert(res.body[i].age, testAge[i]);
       }
   })
    .end(done);
});
        
});
