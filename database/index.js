/**
 * INDEX
 * Launchpoint file for the database
 */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const readline = require('readline');
const si = require('systeminformation');

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./router')(app);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// This section extracts the network interfaces
let interfaces = new Map();

async function startServer() {
    await si.networkInterfaces(function(data) {
        // console.log(data);
        for (let i of data) {
            if(i.ip4 != '') interfaces.set(i.iface.toLowerCase(), i.ip4);
        }
        console.log("Available IP interfaces")
        //console log keys and values of interfaces
        for (let [key, value] of interfaces.entries()) {
            console.log(`${key}: ${value}`);
        }
        console.log('')
    })

    app.use(express.static('static'))

    rl.question("Choose IP address name (case insensitive):",function(name){
        let ip;
        console.log(interfaces)
        if(interfaces.has(name.toLowerCase())) {
            ip = interfaces.get(name.toLowerCase());
            console.log(`IP address at ${ip}`);
        }
        else {
            console.log('DEFAULT: IP address at localhost');
            ip = 'localhost';
        }
        app.listen(3001,ip, function() {  //<- 'wifi' can be replaced by the ip variables obtained from results
            // For the host computer, the database commands are still accessible using the localhost in the url
            // (remove the 'wifi' parameter to return to localhost)
            console.log(`Server started at port 3001`)
        

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
            request('http://'+ip+':3001/user/add',{method:"POST",form: admin},function(err,req,body) {
                // console.log(body);
            });    
        });
        rl.close();
    });
}

startServer();