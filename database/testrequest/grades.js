const request = require('request');

// GRADE TEST
grades = {
  Grades: [  
    {
      Student: "626f8b3e87e2a7ea848f51aa",
      Course: "CMSC 12",
      Grade: "INC",
      Unit: 3.0,
      Weight: 5.5,
      Cumulative: 12,
      Semester: "I",
      Year: "15/16"
    },
    {
      Student: "626f8b3e87e2a7ea848f51aa",
      Course: "CMSC 13",
      Grade: "2",
      Unit: 3.0,
      Weight: 5.5,
      Cumulative: 12,
      Semester: "I",
      Year: "15/16"
    },
  ] 
}

request('http://localhost:3001/grade/add-many',{method:"POST",form: grades},function(err,req,body) {
    console.log(body);
});
