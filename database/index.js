/**
 * INDEX
 * Launchpoint file for the database
 */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./router')(app);

app.use(express.static('static'))
app.listen(3001, function() {
    console.log('Server started at port 3001')

    //create admin account if admin doesn't exist. There will always be exactly one admin
    admin = {
        Username: "admin",
        FirstName: "Admin",
        MiddleName: "_",
        LastName: "User",
        Position: "Chairman",
        Role: "admin",
        Password: "admin",
        History:[]
    }
    
    // // add request
    request('http://localhost:3001/user/add',{method:"POST",form: admin},function(err,req,body) {
        // console.log(body);
    });

});    //can custom set the localhost

app.on('listening', function() {
    
});