/**
 * REQUEST or TEST
 * This file is for testing the database by sending url requests to the localhost database server
 * 
 */
const request = require('request');

// USER TEST
user1 = {
    Username: "user1",
    FirstName : "First",
    MiddleName : "Middle",
    LastName : "Last",
    Position : "Test User for Database",
    Role : "user",
    Password : "1234"    
}

request('http://localhost:3001/add',{method:"POST",form: user1},function(err,req,body) {
    console.log(body);
});

request('http://localhost:3001/find-all',function(err,res,body) {
    console.log(body);
});