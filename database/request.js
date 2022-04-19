/**
 * REQUEST or TEST
 * This file is for testing the database by sending url requests to the localhost database server
 * 
 */
const request = require('request');

// USER TEST
user1 = {
    Username: "user1",
    First_name : "First",
    Middle_name : "Middle",
    Last_name : "Last",
    Position : "Test User for Database",
    Role : "user",
    Password : "1234"    
}

request('http://localhost:3001/add',{method:"POST",form: user1},(err,req,body)=>{
    console.log(body);
});

request('http://localhost:3001/find-all',(err,res,body)=>{
    console.log(body);
});