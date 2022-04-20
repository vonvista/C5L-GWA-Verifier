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
// request('http://localhost:3001/user/add',{method:"POST",form: user1},function(err,req,body) {
//     console.log("SENDING : " + body);
// });

// request('http://localhost:3001/user/add',{method:"POST",form: user2},function(err,req,body) {
//     console.log("SENDING : " + body);
// });

// request('http://localhost:3001/user/add',{method:"POST",form: newUser2},function(err,req,body) {
//     console.log("SENDING : " + body);
// });

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
// request('http://localhost:3001/user/find',{method:"GET",form:{Username:"user1"}},function(err,res,body) {
//     console.log(body);
// });

// delete all
// request('http://localhost:3001/user/delete-all',{method:"DELETE"},function(err,res,body) {
//     console.log(body);
// });

/* COURSE TEST */

course1 = {
    CourseName: "Mga Pag-aaral sa Wika (?)",
    CourseAbbr: "WIKA 1",
    Units: 3,
    CourseType: "required"
}

course2 = {
    CourseName: "Life and Works of Jose Rizal",
    CourseAbbr: "PI 10",
    Units: 3,
    CourseType: "required"
}

course3 = {
    CourseName: "Sining ...",
    CourseAbbr: "ARTS 1",
    Units: 3,
    CourseType: "required"
}

course3update = {
    CourseName: "... Sining",
    CourseAbbr: "ARTS 1",
    Units: 4,
    CourseType: "non-academic"
}

course4 = {
    CourseName: "Film (?)",
    CourseAbbr: "HUM 3",
    Units: 3,
    CourseType: "electives"
}

// request('http://localhost:3001/course/add',{method:"POST",form: course1},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/course/add',{method:"POST",form: course2},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/course/add',{method:"POST",form: course3},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/course/add',{method:"POST",form: course4},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/course/find',{method:"GET",form:{CourseAbbr:"WIKA 1"}},function(err,res,body) {
//     console.log(body);
// });

// request('http://localhost:3001/course/find-all',function(err,res,body) {
//     console.log(body);
// });

// request('http://localhost:3001/course/update', {method:"PUT",form: course3update},function(err,res,body) {
//     console.log(body);
// });

// request('http://localhost:3001/course/delete',{method:"DELETE",form: {CourseAbbr: course4.CourseAbbr}},function(err,req,body) {
//     console.log(body);
// });

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

// GRADE TEST
grade1 = {
    Student: "626015cd10c6532872850a76",
    Course: "626004cc0fe58c4537bbaa16",
    Value: "INC",
    Year: "2021-2022",
    Semester: "1S"
}

grade2 = {
    Student: "626015cd10c6532872850a78",
    Course: "626004cc0fe58c4537bbaa16",
    Value: "1.0",
    Year: "2021-2022",
}

newGrade2 = {
    Student: "626015cd10c6532872850a78",
    Course: "626004cc0fe58c4537bbaa16",
    Value: "1.25",
    Year: "2021-2022",
}

// add grade1
// request('http://localhost:3001/grade/add',{method:"POST",form: grade1},function(err,req,body) {
//     console.log(body);
// });

// add grade2
// request('http://localhost:3001/grade/add',{method:"POST",form: grade2},function(err,req,body) {
//     console.log(body);
// });

// update grade2
// request('http://localhost:3001/grade/update', {method:"PUT",form: newGrade2},function(err,res,body) {
//     console.log(err);
//     console.log(body);
// });

// find one grade
// request('http://localhost:3001/grade/find',{method:"GET",form:{Student: "626015cd10c6532872850a76", Course: "626004cc0fe58c4537bbaa16"}},function(err,res,body) {
//     console.log(body);
// });

// find all grades
// request('http://localhost:3001/grade/find-all',function(err,res,body) {
//     console.log(body);
// });

// delete all
// request('http://localhost:3001/grade/delete-all',{method:"DELETE"},function(err,res,body) {
//    console.log(body);
// });

// delete one grade
// request('http://localhost:3001/grade/delete',{method:"DELETE",form: {Student: "626015cd10c6532872850a76", Course: "626004cc0fe58c4537bbaa16"}},function(err,req,body) {
//     console.log(body);
// });