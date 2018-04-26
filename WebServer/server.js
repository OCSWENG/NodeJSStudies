// router
// 

const express = require('express');
const hbs = require('hbs');
const _ = require('lodash');
const fs = require ('fs');

var app = express();

// include partial 
hbs.registerPartials(__dirname + '/views/partials');

// Handle Bar Engine
app.set('view engine','hbs');

var port = 3000;

// PART 2
// middleware
var path = __dirname + '/public';

// setup a static directory using the middle ware api


app.use((req,res,next) => {
    var now = new Date().toTimeString();
    var fileName = 'webserver.log';
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile(fileName, log +'\n', (err)=>{
        if(err){
            console.log(`Append File ${fileName} failed`);
        }
    });
    console.log(log);
    next(); // application continues to run
});

// Maintainence Mode
//app.use((req,res,next) => {
//    res.render('maintainance.hbs');
//});

app.use(express.static(path));

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (str) => {
    return _.upperCase(str);
});




// PART I
// route handlers
var homeRoute = '/'; //home page
app.get(homeRoute, (req, res) => {
            
            //res.send('<h1>WELCOME</h1><p><b>THE BOLD STATEMENT</b></p>');
    
        res.render('home.hbs',{
                pageTitle: 'About Page',
                welcomeMessage : 'This is text for a paragraph!'      
                       
            });
    }
       
);

var aboutRoute='/about';
app.get(aboutRoute, (req,res)=> {
   res.render('about.hbs', {
       pageTitle: 'About Page',   
   });
    
});



var badUrl = '/bad';
var jsonData = {
    errorMessage: 'Unable to handle request'
    
};

app.get(badUrl, (req,res)=> {
   res.send(jsonData); 
});


app.listen(port, () =>{
    console.log('Server is running on port: '+ port);
});
