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

MongoClient.connect('mongodb://admin:password@localhost:27017/admin')
  .then(client => client.db('admin').admin())
  .then(db => {
    return db.adminCommand({
      createRole: 'admin',
      privileges: [{resource: {db: "KALATAS", collection: ""}, actions: ["listCollections"] }], // access all collections
      roles: []
    })
  })
  .then(() => {
    console.log('Success!')
    //process.exit(0)
  })
  .catch(err => {
    console.log('Error!')
    //process.exit(99)
  })

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
        //console.log(interfaces)
        if(interfaces.has(name.toLowerCase())) {
            ip = interfaces.get(name.toLowerCase());
            console.log(`IP address at ${ip}`);
        }
        else {
            console.log('DEFAULT: IP address at localhost');
            ip = 'localhost';
        }

        app.listen(3001, function() {  
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
            request('http://127.0.0.1:3001/user/add',{method:"POST",form: admin},function(err,req,body) {
                // console.log(body);
            });    
        });
        rl.close();
    });
}

startServer();