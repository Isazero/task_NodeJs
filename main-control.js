const express = require('express');
var session = require('express-session');
const app = express();

app.use(session(
    {
        genid: function(req) {
            return genuuid()
          },
        secret: 'some secret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: false,
            secure: true,
            maxAge: ((60 * 1000) * 60)
        }
    })
);

app.get('/', function(req, res, next) {
    if (req.session.views) {
      req.session.views++
      res.setHeader('Content-Type', 'text/html')
      res.write('<p>views: ' + req.session.views + '</p>')
      res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
      res.end()
    } else {
      req.session.views = 1
      res.end('welcome to the session demo. refresh!')
    }
  })

console.log("session added");