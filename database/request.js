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

// // add request
// request('http://localhost:3001/user/add',{method:"POST",form: user1},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/user/add',{method:"POST",form: user2},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/user/add',{method:"POST",form: newUser2},function(err,req,body) {
//     console.log("SENDING : " + body);
// });

// // view all
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

// course1 = {
//     CourseName: "Mga Pag-aaral sa Wika (?)",
//     CourseAbbr: "WIKA 1",
//     Units: 3,
//     CourseType: "required"
// }

// course2 = {
//     CourseName: "Life and Works of Jose Rizal",
//     CourseAbbr: "PI 10",
//     Units: 3,
//     CourseType: "required"
// }

// course3 = {
//     CourseName: "Sining ...",
//     CourseAbbr: "ARTS 1",
//     Units: 3,
//     CourseType: "required"
// }

// course3update = {
//     CourseName: "... Sining",
//     CourseAbbr: "ARTS 1",
//     Units: 4,
//     CourseType: "non-academic"
// }

// course4 = {
//     CourseName: "Film (?)",
//     CourseAbbr: "HUM 3",
//     Units: 3,
//     CourseType: "electives"
// }

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

// degree1 = {
//     DegreeID: "BSCS",
//     DegreeName: "Bachelor of Science in Computer Science",
//     Major: "N/A",
//     RequiredUnits: 130
// }

// degree2 = {
//     DegreeID: "BSAGCHEM",
//     DegreeName: "Bachelor of Science in Agricultural Chemistry",
//     Major: "Animal Science",
//     RequiredUnits: 190
// }

// updatedegree1 = {
//     DegreeID: "BSCS",
//     DegreeName: "Bachelor of Science in Computer Science",
//     Major: "N/A",
//     RequiredUnits: 145
// }

// request('http://localhost:3001/degree/add',{method:"POST",form: degree1},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/degree/add',{method:"POST",form: degree2},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/degree/update',{method:"PUT",form: updatedegree1},function(err,req,body) {
//         console.log(err);
//         console.log(body);
// });

// request('http://localhost:3001/degree/delete',{method:"DELETE",form: {DegreeID: "BSAGCHEM"}},function(err,req,body) {
//     console.log(body);
// }); 

//STUDENT TEST

student1 = {
    StudentID: 201909230,
    FirstName: "Test",
    MiddleName: "Middle",
    LastName: "User",
    Degree: "BS Computer Science",
    Course: "?",
    TotalUnits: 130,
    TotalUnits2: 131,
    TotalCumulative: 1.25,
    OverallGWA: 1.25,
    Status: "Pending"
}

student2 = {
    StudentID: "201967892",
    FirstName: "Isko",
    LastName: "Moreno",
    MiddleName: "Withdraw",
    Degree: "BS Economics",
    Course: "ECON 11",
    TotalUnits: 75,
    TotalUnits2: 75,
    TotalCumulative: 75,
    OverallGWA: 2.75,
    Status: "Pending"
}

student3 = {
    StudentID: "201934908",
    FirstName: "Manny",
    LastName: "Pacquiao",
    MiddleName: "Praye",
    Degree: "BS Economics",
    Course: "ECON 11",
    TotalUnits: 90,
    TotalUnits2: 90,
    TotalCumulative: 90,
    OverallGWA: 1.75,
    Status: "Pending"
}

updatestudent2 = {
    StudentID: "201967892",
    FirstName: "Isko",
    LastName: "Moreno",
    MiddleName: "Withdraw",
    Degree: "BS Withdraw",
    Course: "ECON 11",
    TotalUnits: 80,
    TotalUnits2: 80,
    TotalCumulative: 80,
    OverallGWA: 3.00
}

// request('http://localhost:3001/student/add',{method:"POST",form: student1},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/student/add',{method:"POST",form: student2},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/student/add',{method:"POST",form: student3},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/student/update',{method:"PUT",form: updatestudent2},function(err,req,body) {
//         console.log(err);
//         console.log(body);
// });

// request('http://localhost:3001/student/delete',{method:"DELETE",form: {StudentID: "201934908"}},function(err,req,body) {
//     console.log(body);

// });

// request('http://localhost:3001/student/find',{method:"POST",form:{StudentID: "201912345"}},function(err,res,body) {
//     console.log(body);
// });


// GRADE TEST
grade1 = {
    Student: "626015cd10c6532872850a76",
    Course: "CMSC 12",
    Grade: "INC",
    Unit: 3.0,
    Cumulative: 12,
    SemesterYear: "I/15/16"
}

grade2 = {
    Student: "626015cd10c6532872850a78",
    Course: "CMSC 23",
    Grade: "1.0",
    Unit: 3.0,
    Weight: 3.0,
    Cumulative: 15,
    SemesterYear: "II/21/22"
}

newGrade2 = {
    Student: "626015cd10c6532872850a78",
    Course: "CMSC 23",
    Grade: "1.25",
    Unit: 3.0,
    Weight: 3.75,
    Cumulative: 15.75,
    SemesterYear: "II/21/22"
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
// request('http://localhost:3001/grade/find',{method:"POST",form:{Student: "626015cd10c6532872850a76", Course: "CMSC 12"}},function(err,res,body) {
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
// request('http://localhost:3001/grade/delete',{method:"DELETE",form: {Student: "626015cd10c6532872850a76", Course: "CMSC 12"}},function(err,req,body) {
//     console.log(body);
// });


//login request
// request('http://localhost:3001/user/login',{method:"GET",form: {Username: "user2", Password: "1234"}},function(err,req,body) {
//     console.log(body);
// });


// HISTORY TEST

history1 = {
    User: "6263e3ba810d682dc3b4b7eb",
    Date: "11/21/20",
    Time: "11:00",
    Description: "delete",
    Details: "deleted student record with id 34845834534",
}

history2 = {
    User: "6263e3ba810d682dc3b4b7eb",
    Date: "2/05/21",
    Time: "23:00",
    Description: "create",
    Details: "created student record with id 43556457467",
}

newhistory2 = {
    User: "6261a622b1e9d4e16f7b2848",
    Date: "2/13/21",
    Time: "4:00",
    Description: "update",
    Details: "updated student record with id 43556457467",
}

// request('http://localhost:3001/history/add',{method:"POST",form: history1},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/history/add',{method:"POST",form: history2},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/history/update', {method:"PUT",form: newhistory2},function(err,res,body) {
//     console.log(err);
//     console.log(body);
// });

// request('http://localhost:3001/history/delete-all',{method:"DELETE"},function(err,res,body) {
//    console.log(body);
// });

// request('http://localhost:3001/grade/delete-all',{method:"DELETE"},function(err,res,body) {
//    console.log(body);
// });

/*  NOTE TEST   */

note1 = {
    User:"626917dc9356e3d73ba366ad",
    Student:"626917aa9356e3d73ba366a5",
    SemesterYear:"1S2020-2021",
    Details:"Hatdog ang sem na ito"
}

note2 = {
    User:"626917aa9356e3d73ba366a7",
    Student:"6263d5beb7b0bf7535f1d3cc",
    SemesterYear:"2S2020-2021",
    Details:"Hatdog ang sem na ito"
}

newNote2 = {
    id:"6263d618b7b0bf7535f1d3d6",
    User:"6263d4c80791d8b67842ec86",
    Student:"6263d5beb7b0bf7535f1d3cc",
    SemesterYear:"2S2020-2021",
    Details:"Solid ang sem na ito"
}

// request('http://localhost:3001/note/add',{method:"POST",form: note1},function(err,req,body) {
//     console.log(body);
// });
// request('http://localhost:3001/note/add',{method:"POST",form: note2},function(err,req,body) {
//     console.log(body);
// });

// request('http://localhost:3001/note/find-all',function(err,res,body) {
//     console.log(JSON.stringify(JSON.parse(body),null,2));
// });

// request('http://localhost:3001/note/find',{method:"GET",form:{id:"6263d618b7b0bf7535f1d3d4"}},function(err,res,body) {
//     console.log(JSON.stringify(JSON.parse(body),null,2));
// });

request('http://localhost:3001/note/find-by-student',{method:"POST",form:{Student:"6263d5beb7b0bf7535f1d3cc"}},function(err,res,body) {
    console.log(JSON.stringify(JSON.parse(body),null,2));
});

// request('http://localhost:3001/note/update',{method:"PUT",form:newNote2},function(err,res,body) {
//     console.log(JSON.stringify(JSON.parse(body),null,2));
// });

// request('http://localhost:3001/note/delete',{method:"DELETE",form:{id:"6263d618b7b0bf7535f1d3d6"}},function(err,res,body) {
//     // console.log(JSON.stringify(JSON.parse(body),null,2));
//     console.log(body);
// });