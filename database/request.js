/**
 * REQUEST or TEST
 * This file is for testing the database by sending url requests to the localhost database server
 * 
 */
const request = require('request');


//DEGREE TEST

degree1 = {
    DegreeID: "BSCS",
    DegreeName: "Bachelor of Science in Computer Science",
    Major: "N/A",
    RequiredUnits: 130
}

degree2 = {
    DegreeID: "BSAGCHEM",
    DegreeName: "Bachelor of Science in Agricultural Chemistry",
    Major: "Animal Science",
    RequiredUnits: 190
}

request('http://localhost:3001/degree/add',{method:"POST",form: degree1},function(err,req,body) {
    console.log(body);
});

request('http://localhost:3001/degree/add',{method:"POST",form: degree2},function(err,req,body) {
    console.log(body);
});

//STUDENT TEST

student1 = {
    StudentID: "201912345",
    FirstName: "Leni",
    LastName: "Robredo",
    MiddleName: "Gerona",
    Degree: "625ff4f790dd2d72f6bed962",
    TotalUnits: 100,
    OverallGWA: 1.00
}

student2 = {
    StudentID: "201967892",
    FirstName: "Isko",
    LastName: "Moreno",
    MiddleName: "Withdraw",
    Degree: "625fffc4e920178dd47f1273",
    TotalUnits: 79,
    OverallGWA: 2.75
}

request('http://localhost:3001/student/add',{method:"POST",form: student1},function(err,req,body) {
    console.log(body);
});

request('http://localhost:3001/student/add',{method:"POST",form: student2},function(err,req,body) {
    console.log(body);
});