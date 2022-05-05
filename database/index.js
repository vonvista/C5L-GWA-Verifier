/**
 * INDEX
 * Launchpoint file for the database
 */
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const {networkInterfaces} = require('os');
const readline = require('readline');
const { resolve } = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// This section extracts the ethernet and wifi ip addresses
const nets = networkInterfaces();
const results = Object.create(null);
for (const name of Object.keys(nets)){
    for(const net of nets[name]){
        // check if ipv4 address is not an internal address ie the ip is accessible thru LAN
        if(net.family=='IPv4' && !net.internal){
            if(!results[name]) results[name]=[]
            results[name].push(net.address);
        }
    }
}
console.log(results); //<- uncomment to see ip addresses in results
const eth = results['Ethernet 6'];
const wifi = results['Wi-Fi'];

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

require('./router')(app);

app.use(express.static('static'))

// let getChoice = new Promise(function(res,err){
//     var choice = rl.question("Choose ip name:");
//     var ip = results[choice]
//     console.log(ip)
//     if (ip==''){
//         err("Invalid IP name");
//     } else res(ip);
// })
// const ip = results[choice];
rl.question("Choose IP address name:",function(name){
    let ip = results[name];
    if(ip!='') console.log(`IP address at ${ip}`);
    else console.log('Empty choice: IP address at localhost')
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
})
n

// app.listen(3001,wifi, function() {  //<- 'wifi' can be replaced by the ip variables obtained from results
//     // For the host computer, the database commands are still accessible using the localhost in the url
//     // (remove the 'wifi' parameter to return to localhost)
//     console.log(`In
//     wifi ip ${wifi}
//     ethernet ip ${eth}
// Server started at port 3001`)

//     //create admin account if admin doesn't exist. There will always be exactly one admin
//     admin = {
//         Username: "admin",
//         FirstName: "Admin",
//         MiddleName: "_",
//         LastName: "User",
//         Position: "Chairman",
//         Role: "admin",
//         Password: "admin",
//         History:[]
//     }
    
//     // // add request
//     request('http://'+wifi+':3001/user/add',{method:"POST",form: admin},function(err,req,body) {
//         // console.log(body);
//     });

// });    //can custom set the localhost

app.on('listening', function() {
    
});