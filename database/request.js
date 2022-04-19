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

request('http://localhost:3001/user/add',{method:"POST",form: user1},function(err,req,body) {
    console.log(body);
});

request('http://localhost:3001/user/find-all',function(err,res,body) {
    console.log(body);
});

// GRADE TEST
grade1 = {
    Value: "INC",
    Year: "2021-2022",
    Semester: "1S"
}

grade2 = {
    Value: "1.0",
    Year: "2021-2022",
}

request('http://localhost:3001/grade/add',{method:"POST",form: grade1},function(err,req,body) {
    console.log(body);
});

request('http://localhost:3001/grade/add',{method:"POST",form: grade2},function(err,req,body) {
    console.log(body);
});

request('http://localhost:3001/grade/find-all',function(err,res,body) {
    console.log(body);
});