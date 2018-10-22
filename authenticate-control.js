var bcrypt = require('bcryptjs');
var connection = require('./../config');
var nodeMailer = require('nodemailer');
const express = require('express');


const app = express();
var transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: '@gmail.com',
      pass: 'pass'
    }
  });

module.exports.authenticate = function(req,res)
{
    var email = req.body.email;
    var passwd = req.body.password
    connection.query('SELECT * FROM user WHERE email = ?',[email],function(error,results,fields)
    {
        if(error)
        {
            res.json({
                status:false,
                message:'error in the query'
            })
        }
        else
        {
             if(results.length > 0)
            {
                console.log(results[0].passwd);
                isRealPswd = bcrypt.compareSync(passwd,results[0].passwd)
                console.log(isRealPswd);
                if(isRealPswd)
                {
                    res.json(
                        {
                            status:true,
                            message: 'Successfully authenticated'
                        });
                }
                else
                {
                    res.json(
                        {
                            status:false,
                            message: 'Email or password does not match'
                        });
        
                }
                if(results[0].ipAdress!=req.connection.remoteAddress)
                {
                    console.log("different Ip: " + req.connection.remoteAddress);
                    var mailOptions = {
                        from: 'youremail@gmail.com',
                        to: results[0].email,
                        subject: 'Different Ip',
                        text: 'Somebody tries to login into your account from different ip'
                      };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                    });
                }
            }
            else
            {
                res.json({
                    status:false,    
                    message:"Email does not exits"
                    });  
            }
        }
    });
}
var main = require('./main-control');
app.get('/',function(req,res){
    res.sendFile(__dirname+"/"+"main.html");
});

