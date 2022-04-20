/**
 * NOTE: This is a copy of my controller.js in exer 10 in CMSC 100.
 * WIP: DO NOT USE AS-IS
 * Carlos Angelo L. Rayel | 19-04-2022
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// name of the database will be BALANGKAS
const db = mongoose.createConnection('mongodb://localhost:27017/KALATAS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// -----------------------------U S E R S   S E C T I O N----------------------------------------

// USER SCHEMA
const userSchema = new Schema({
    Username : {type: String, required : true, unique: true},
    FirstName : {type: String, required : true},
    LastName : {type: String, required : true},
    MiddleName : {type: String, required : true},
    Position : {type: String, required : true},
    Role : {type: String, required : true, enum : ['user','admin']},
    Password : {type: String, required : true}
  },{autoCreate:true});


// models for the database
// NOTE: creating a model with a unique attribute will cause mongoose to auto-create a collection for the model
// USER MODEL
const User = db.model('user',userSchema);


/**
 * METHODS
 * format: exports.<function_name> = (req, res, next) => {
 * <code>
 * }
 */


/**
 * SECTION : users
 * functions - findAll, add
 * NOTE: need to change the functions to be specific to the collection (in this case, users)
 */
// find all users
exports.userFindAll = function(req, res, next) {
  User.find(function(err, users) {
    if (!err) { res.send(users) }
  });
}

exports.userFind = function(req, res, next) {
  User.findOne({Username:req.body.Username}, function(err, User){
    if(!err) {res.send(User);}
  });
}

// add user
exports.userAdd = function(req, res, next) {
  // UNCOMMENT TO SEE REQUEST CONTENTS AND MAPPING TO USER MODEL
  // console.log(req.body);
  
  var newUser = new User({
    Username: req.body.Username,
    FirstName: req.body.FirstName,
    MiddleName: req.body.MiddleName,
    LastName: req.body.LastName,
    Position: req.body.Position,
    Role: req.body.Role,
    Password: req.body.Password
  });
  // console.log(newUser);
  

  newUser.save(function(err) {
    if (!err) { res.send(newUser)}
    else { res.send('Unable to save user') }
  });
}



// delete a user
exports.userDelete = function(req, res, next) {
  // console.log(req.body);
  User.findOneAndDelete({Username : req.body.Username},function(err, User){
    if(!err && User){
      res.send('Successfully deleted ' + User.Username);
    } else {
      res.send('Unable to delete user');
    }
  });
}

// clean collection
exports.userDeleteAll = function(req, res, next) {
  // console.log(req.body);
  User.deleteMany({},function(err){
    if(!err){
      res.send('Successfully deleted users');
    } else {
      res.send('Unable to delete users');
    }
  });
}

// update a user
exports.userUpdate = function(req, res, next) {
  // console.log(req.body);
  User.updateOne({Username : req.body.Username},{"$set":{
    "FirstName": req.body.FirstName,
    "MiddleName": req.body.MiddleName,
    "LastName": req.body.LastName,
    "Position": req.body.Position,
    "Role": req.body.Role,
    "Password": req.body.Password
  }}, {new : true}, function(err,result){
    if(!err && User){
      res.send(result);
    } else {
      res.send('Unable to update user');
    }
  })
}
// -----------------------------G R A D E S   S E C T I O N----------------------------------------

// GRADE SCHEMA
const gradeSchema = new Schema({
  Student: {type: Schema.Types.ObjectId, ref: 'student', required: true},
  Course: {type: Schema.Types.ObjectId, ref: 'course', required: true},
  Value: {type: String, required: true},
  Year: {type: String, required: true},
  Semester: String
},{autoCreate:true})

// GRADE MODEL
const Grade = db.model('grade', gradeSchema);

// COMBINATION OF STUDENT AND COURSE ID IS UNIQUE
gradeSchema.index({Student: 1, Course: 1} , {unique: true});

/**
 * SECTION : grades
 * functions - gradeFindAll (read), gradeFindOne (read one element), gradeAdd (create), gradeUpdateOne (update), 
 *             gradeDeleteOne (delete one element), gradeDeleteAll (delete)
 */

// Find all grades
exports.gradeFindAll = function(req, res, next) {
  Grade.find((err, grades) => {
    if (!err) { res.send(grades) }
  });
}

// Find one grade
exports.gradeFindOne = function(req, res, next) {
  Grade.findOne((err, grade) => {
    if (err) {
      res.send('Unable to find grade')
    } else {
      res.send(grade)
    }
  });
}

// Add grade
exports.gradeAdd = function(req, res, next) {
  // UNCOMMENT TO SEE REQUEST CONTENTS AND MAPPING TO USER MODEL
  // console.log(req.body);
  
  var newGrade = new Grade({
    Student: mongoose.Types.ObjectId(req.body.Student),
    Course: mongoose.Types.ObjectId(req.body.Course),
    Value: req.body.Value,
    Year: req.body.Year,
    Semester: req.body.Semester
  });
  console.log(newGrade);
  

  newGrade.save(function(err) {
    if (!err) { res.send(newGrade)}
    else { res.send('Unable to save grade') }
  });


}

// Update a grade by using Student and Course
exports.gradeUpdateOne = function(req, res, next) {
  // console.log(req.body);

  Grade.updateOne({Student: req.body.Student, Course: req.body.Course},{"$set":{
    "Student": req.body.Student,
    "Course": req.body.Course,
    "Value": req.body.Value,
    "Year": req.body.Year,
    "Semester": req.body.Semester
  }}, {new : true}, function(err,result){
    if(!err && Grade){
      res.send(result);
    } else {
      res.send('Unable to update grade');
    }
  })
} 

// Delete a grade by using Student and Course
exports.gradeDeleteOne = function(req, res, next) {
  // console.log(req.body);
  Grade.findOneAndDelete({Student: req.body.Student, Course: req.body.Course},function(err, Grade){
    if(!err && Grade){
      res.send('Successfully deleted ' + req.body.Student + " " + req.body.Course);
    } else {
      res.send('Unable to delete grade');
    }
  });
}

// Delete grade collection
exports.gradeDeleteAll = function(req, res, next) {
  // console.log(req.body);
  Grade.deleteMany({},function(err){
    if(!err){
      res.send('Successfully deleted grades');
    } else {
      res.send('Unable to delete grades');
    }
  });
}

// -----------------------------C O U R S E   S E C T I O N----------------------------------------

// COURSE SCHEMA
const courseSchema = new Schema({
  CourseName: {type: String, required: true, unique: true},
  CourseAbbr: {type: String, required: true, unique: true},
  Units: {type: Number, required: true},
  CourseType: {type: String, required: true, enum: ['required', 'non-academic', 'electives']}
},{autoCreate:true});

// COURSE MODEL
const Course = db.model('course',courseSchema);

/**
 * SECTION : COURSE
 * functions - create/add, read/find, update, delete
 * NOTE: need to change the functions to be specific to the collection (in this case, users)
 */

// create/add course
exports.courseAdd = function(req, res, next) {
  // UNCOMMENT TO SEE REQUEST CONTENTS AND MAPPING TO USER MODEL
  // console.log(req.body);
  
  var newCourse = new Course({
    CourseName: req.body.CourseName,
    CourseAbbr: req.body.CourseAbbr,
    Units: req.body.Units,
    CourseType: req.body.CourseType
  });
  console.log(newCourse);

  newCourse.save(function(err) {
    if (err) {
      res.send('Unable to save course')
    } else {
      res.send(newCourse)
    }
  });
}

// find one course
exports.courseFindOne = function(req, res, next) {
  Course.findOne((err, course) => {
    if (err) {
      res.send('Unable to find course')
    } else {
      res.send(course)
    }
  });
}

// find all course
exports.courseFindAll = function(req, res, next) {
  Course.find((err, courses) => {
    if (err) {
      res.send('Unable to find all courses')
    } else {
      res.send(courses)
    }
  });
}

// update one course
exports.courseUpdateOne = function(req, res, next) {
  Course.updateOne({CourseAbbr: req.body.CourseAbbr}, {"$set":{
    CourseName: req.body.CourseName,
    CourseAbbr: req.body.CourseAbbr,
    Units: req.body.Units,
    CourseType: req.body.CourseType
  }}, {new : true}, function(err, result){
    if (err) {
      res.send('Unable to update course');
    } else {
      res.send(result);
    }
  });
}

// delete one course
exports.courseDeleteOne = function(req, res, next) {
  Course.findOneAndDelete({CourseAbbr: req.body.CourseAbbr}, function(err, Course){
    if(err) {
      res.send('Unable to delete course');
    } else {
      res.send('Successfully deleted ' + Course.CourseAbbr);
    }
  });
}

// -----------------------------D E G R E E  S E C T I O N----------------------------------------

// DEGREE SCHEMA
const degreeSchema = new Schema({
  DegreeID: {type: String, required : true, enum : ['BSAMAT', 'BSMATH', 'BSMST', 'BSAPHY', 'BSCS',
  'BSCHEM', 'BSAGCHEM', 'BSSTAT', 'BSBIO', 'BSSOCIO', 'BAPHILO', 'BACA']},
  DegreeName: {type: String, required : true},
  Major: {type: String, required : false},
  RequiredUnits: {type: Number, required : true},
},{autoCreate:true});


// DEGREE MODEL
const Degree = db.model('degree', degreeSchema);


// find degree
exports.degreeFindAll = function(req, res, next) {
Degree.find(function(err, degree) {
  if (!err) { res.send(degree) }
});
}

exports.degreeFindOne = function(req, res, next) {
Degree.findOne({DegreeID:req.body.DegreeID}, function(err, Degree){
  if(!err) {res.send(Degree);}
});
}

// add degree
exports.degreeAdd = function(req, res, next) {
  
  var newDegree = new Degree({
    DegreeID: req.body.DegreeID,
    DegreeName: req.body.DegreeName,
    Major: req.body.Major,
    RequiredUnits: req.body.RequiredUnits
  });
  console.log(newDegree);

  newDegree.save(function(err) {
    if (!err) { res.send(newDegree)}
    else { res.send('Unable to save degree') }
  });
}

// update degree
exports.degreeUpdateOne = function(req, res, next) {
Degree.updateOne({DegreeID:req.body.DegreeID},{"$set":{
  "DegreeID": req.body._id,
  "DegreeName": req.body.DegreeName,
  "Major": req.body.Major,
  "RequiredUnits": req.body.RequiredUnits
}}, {new : true}, function(err,result){
  if(!err && Degree){
    res.send(result);
  } else {
    res.send('Unable to update degree');
  }
})
}


// -----------------------------S T U D E N T  S E C T I O N----------------------------------------

// STUDENT SCHEMA
const studentSchema = new Schema({
  StudentID: {type: String, required : true, unique: true},
  FirstName : {type: String, required : true},
  LastName : {type: String, required : true},
  MiddleName : {type: String, required : true},
  Degree: {type: Schema.Types.ObjectId, ref: 'degree'},
  TotalUnits: {type: Number, required : true},
  OverallGWA: {type: Number, required : true},
},{autoCreate:true});



// STUDENT MODEL
const Student = db.model('student', studentSchema);


// find student
exports.studentFindAll = function(req, res, next) {
Student.find(function(err, student) {
  if (!err) { res.send(student) }
});
}

exports.studentFindOne = function(req, res, next) {
Student.findOne({StudentID:req.body.StudentID}, function(err, Student){
  if(!err) {res.send(Student);}
});
}

// add student
exports.studentAdd = function(req, res, next) {
  
  var newStudent = new Student({
    StudentID: req.body.StudentID,
    FirstName: req.body.FirstName,
    MiddleName: req.body.MiddleName,
    LastName: req.body.LastName,
    Degree: mongoose.Types.ObjectId(req.body.Degree),
    TotalUnits: req.body.TotalUnits,
    OverallGWA: req.body.OverallGWA
  });
  console.log(newStudent);

  newStudent.save(function(err) {
    if (!err) { res.send(newStudent)}
    else { res.send('Unable to save student') }
  });
}

// update student
exports.studentUpdateOne = function(req, res, next) {
Student.updateOne({_id:req.body._id},{"$set":{
  "StudentNo.": req.body.StudentID,
  "FirstName": req.body.FirstName,
  "MiddleName": req.body.MiddleName,
  "LastName": req.body.LastName,
  "Degree": req.body.Degree,
  "TotalUnits": req.body.TotalUnits,
  "OverallGWA": req.body.OverallGWA  
}}, {new : true}, function(err,result){
  if(!err && Student){
    res.send(result);
  } else {
    res.send('Unable to update student');
  }
})
}