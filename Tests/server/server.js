const webserver = require('express');
var app = webserver();

app.get('/', (req,res) => {
   res.status(404).send({
      error: "Page Not Found" 
   });
});


app.get('/users', (req,res) => {
    res.send([{
        name: 'orange',
        age: 33
    }, {
        name: "apple",
        age: 25
    }, {
        name: 'pear',
        age: 22
    } 
    ]);
    
});

app.listen(3000);

module.exports.app = app;
