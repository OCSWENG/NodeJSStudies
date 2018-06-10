const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;

const pathToPublic = path.join(__dirname, '..','/public');

var app = express();

app.use(express.static(pathToPublic));

app.listen(port, () => {
    console.log('Server is up on port: ${port}');
});




