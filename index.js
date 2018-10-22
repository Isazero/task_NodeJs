const express = require('express');
var https = require('https');
var http = require('http');
const fs = require('fs');
var bodyParser = require('body-parser');

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
   cert: fs.readFileSync('./cert.pem')
}

var connection = require('./config');

var authControl = require('./controls/authenticate-control');
var regControl = require('./controls/registration-control');
var mainControl = require('./controls/main-control');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.sendFile(__dirname+"/"+"index.html");
})

app.get('/login.html',function(req,res){
  res.sendFile(__dirname+"/"+"login.html");
})

app.get('/main.html',function(req,res){
  res.sendFile(__dirname+"/"+"main.html");
})

app.post('/api/register',regControl.register);
app.post('/api/authenticate',authControl.authenticate);

app.post('/controls/registration-control',regControl.register);
app.post('/controls/authenticate-control',authControl.authenticate);

//http.createServer(app).listen(8000);
https.createServer(httpsOptions, app).listen(8012);










