
var bcrypt = require('bcryptjs');
var express = require('express');
var connection = require('./config');

module.exports.register = function(req,res){
    var today = new Date();
   var salt = bcrypt.genSaltSync(10);
   var passwd = bcrypt.hashSync(req.body.password,salt);
   console.log(passwd);
   var today = new Date();
   
 
    var users = 
    {
        "login":req.body.name,
        "passwd":passwd,
        "email":req.body.email,
        "dateCreated":today,
        "lastLogin":today,
        "ipAdress":req.connection.remoteAddress
    }
    connection.query('INSERT INTO user SET ?',users,function(error, results, fields) {
        if (error) 
        {
            res.json(
                {
                status:false,
                message:'ERROR in query'
            })
        }
        else
        {
            res.json(
                {
                    status:true,
                    data: results,
                    message: 'user registered succesfully'
                })
        }
    });
}