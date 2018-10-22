const express = require('express');
var session = require('express-session');
const app = express();

app.get('/',function(req,res,next)
{
    if(req.session)
    {
        res.setHeader('Content-Type', 'text/html')
        res.write('<p> Current session will be destroyed </p>')
        req.session.destroy;
    }
});