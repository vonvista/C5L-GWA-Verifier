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
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(cors())
app.use(bodyParser.json({limit: '16mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '16mb' }));

require('./router')(app);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// This section extracts the network interfaces
let interfaces = new Map();

async function startServer() {
    await si.networkInterfaces(function(data) {
        for (let i = 0; i < data.length; i++) {
            if(data[i].ip4 != '') {
                interfaces.set(i.toString(), data[i].ip4);
            } 
        }
        console.log("Available IP interfaces")
        //console log keys and values of interfaces
        for (let i = 0; i < data.length; i++) {
            if(data[i].ip4 != '') {
                console.log(`[${i}] ${data[i].iface}(${data[i].ifaceName}): ${data[i].ip4}`);
            } 
        }
        console.log('')
    })

    app.use(express.static('static'))

    rl.question("Choose IP address (number):",async function(name){
        let ip;
        //console.log(interfaces)
        if(interfaces.has(name)) {
            ip = interfaces.get(name);
            console.log(`IP address at ${ip}`);
        }
        else {
            console.log('DEFAULT: IP address at localhost');
            ip = '127.0.0.1';
        }

        app.listen(3001, function() {  
            // For the host computer, the database commands are still accessible using the localhost in the url
            // (remove the 'wifi' parameter to return to localhost)
            console.log(`Server started at port 3001`)
        
            // //create admin account if admin doesn't exist. There will always be exactly one admin
            // admin = {
            //     Username: "admin",
            //     FirstName: "Admin",
            //     MiddleName: "_",
            //     LastName: "User",
            //     Position: "Chairman",
            //     Role: "admin",
            //     Password: "admin",
            //     History:[]
            // }
            
            // // // add request
            request('http://127.0.0.1:3001/user/create-admin',{method:"GET"},function(err,req,body) {
                console.log(body);
            });  
        });
        rl.close();
    });
}

startServer();