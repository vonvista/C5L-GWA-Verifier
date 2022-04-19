/**
 * REQUEST or TEST
 * This file is for testing the database by sending url requests to the localhost database server
 * 
 */
const request = require('request');

// -----------------------------U S E R S   S E C T I O N----------------------------------------
user1 = {
    Username: "user1",
    FirstName : "First",
    MiddleName : "Middle",
    LastName : "Last",
    Position : "Test User for Database",
    Role : "user",
    Password : "1234"    
}

user2 = {
    Username: "user2",
    FirstName : "Second",
    MiddleName : "Middle",
    LastName : "Last",
    Position : "Test User for Database",
    Role : "user",
    Password : "5678"       
}

newUser2 = {
    Username: "user2",
    FirstName : "Third",
    MiddleName : "Middle",
    LastName : "Last",
    Position : "Test User for Database",
    Role : "user",
    Password : "hatdog"
}

// add request
request('http://localhost:3001/user/add',{method:"POST",form: user1},function(err,req,body) {
    console.log("SENDING : " + body);
});

request('http://localhost:3001/user/add',{method:"POST",form: user2},function(err,req,body) {
    console.log("SENDING : " + body);
});

// view all
// request('http://localhost:3001/user/find-all',function(err,res,body) {
//     console.log(body);
// });

// delete one by username
// request('http://localhost:3001/user/delete',{method:"DELETE",form: {Username: user2.Username}},function(err,req,body) {
    //     console.log(body);
    // });
    
// update user
// request('http://localhost:3001/user/update', {method:"PUT",form: newUser2},function(err,res,body) {
//     console.log(err);
//     console.log(body);
// });

// find one
request('http://localhost:3001/user/find',{method:"GET",form:{Username:"user1"}},function(err,res,body) {
    console.log(body);
});

// delete all
request('http://localhost:3001/user/delete-all',{method:"DELETE"},function(err,res,body) {
    console.log(body);
});