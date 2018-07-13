var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('privatekey.pem');
var certificate = fs.readFileSync('certificate.pem');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here
app.get('/home' , (req,res) => {
    res.send('hello')
})
//var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//httpServer.listen(8080);
httpsServer.listen(8443);