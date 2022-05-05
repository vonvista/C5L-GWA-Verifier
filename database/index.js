/**
 * INDEX
 * Launchpoint file for the database
 */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const ni = require('network-interfaces');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./router')(app);

const options = {
    internal: false,  // boolean: only acknowledge internal or external addresses (undefined: both)
    ipVersion: 4      // integer (4 or 6): only acknowledge addresses of this IP address family (undefined: both)
};

for (let interfaceName of interfaceNames) {
    const addresses = ni.toIp(interfaceName, options);
    console.log( `${interfaceName}: ${addresses}`);
}

app.use(express.static('static'))
app.listen(3001,wifi, function() {  //<- 'wifi' can be replaced by the ip variables obtained from results
    // For the host computer, the database commands are still accessible using the localhost in the url
    // (remove the 'wifi' parameter to return to localhost)

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
    request('http://'+wifi+':3001/user/add',{method:"POST",form: admin},function(err,req,body) {
        // console.log(body);
    });

});    //can custom set the localhost

app.on('listening', function() {
    
});