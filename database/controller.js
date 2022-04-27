/**
 * CONTROLLER
 * controller file to hold the functions of the database
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

saltRounds = 8; // number of rounds to hash the password

// name of the database will be KALATAS
const db = mongoose.createConnection('mongodb://localhost:27017/KALATAS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//NOTE: all responses must be in JSON form
// err - error response; suc - success response;

// -----------------------------U S E R S   S E C T I O N----------------------------------------
// Primary contributer - Carlos Rayel
// USER SCHEMA
const userSchema = new Schema({
    Username : {type: String, required : true, unique: true},
    FirstName : {type: String, required : true},
    LastName : {type: String, required : true},
    MiddleName : {type: String, required : true},
    Position : {type: String, required : true},
    Role : {type: String, required : true, enum : ['user','admin']},
    Password : {type: String, required : true},
    History:{type:Array, required:true}
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
 * functions - findAll, add, find, delete, update, deleteAll
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
    if(!err) { res.send(User); }
    else { res.send({err:'Unable to find user'}) }
  });
}

// add user
exports.userAdd = async function(req, res, next) {
  // UNCOMMENT TO SEE REQUEST CONTENTS AND MAPPING TO USER MODEL
  // console.log(req.body);

  var hashedPassword = await bcrypt.hash(req.body.Password, saltRounds); //encrpyt password first -vov
  
  var newUser = new User({
    Username: req.body.Username,
    FirstName: req.body.FirstName,
    MiddleName: req.body.MiddleName,
    LastName: req.body.LastName,
    Position: req.body.Position,
    Role: req.body.Role,
    Password: hashedPassword,
    History:[]
  });
  console.log(newUser);


  newUser.save(function(err) {
    if (!err) { res.send(newUser)}
    else { res.send({err:'Unable to save user'}) }
  });
}



// delete a user
exports.userDelete = function(req, res, next) {
  // console.log(req.body);
  User.findOneAndDelete({Username : req.body.Username},function(err, User){
    if(!err && User){
      res.send({suc:'Successfully deleted ' + User.Username});
    } else {
      res.send({err:'Unable to delete user'});
    }
  });
}

// clean collection
exports.userDeleteAll = function(req, res, next) {
  // console.log(req.body);
  User.deleteMany({},function(err){
    if(!err){
      res.send({suc:'Successfully deleted users'});
    } else {
      res.send({err:'Unable to delete users'});
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
      res.send({err:'Unable to update user'});
    }
  })
}

//user login -vov
exports.userLogin = async function(req, res, next) {
  
  const user = await User.findOne({Username: req.body.Username});
  if(user){
    const passwordMatch = await bcrypt.compare(req.body.Password, user.Password);
    if(passwordMatch){
      res.send(user);
    } else {
      res.send({err:'Incorrect password'});
    }
  }
  else {
    res.send({err:'User not found'});
  }
}


// -----------------------------G R A D E S   S E C T I O N----------------------------------------

// GRADE SCHEMA
const gradeSchema = new Schema({
  Student: {type: Schema.Types.ObjectId, ref: 'student', required: true},
  Course: {type: String, required: true},
  Grade: {type: String, required: true},
  Unit: {type: Number, required: true},
  Weight: Number,
  Cumulative: {type: Number, required: true},
  SemesterYear: String
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
      res.send({err:'Unable to find grade'})
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
    Course: req.body.Course,
    Grade: req.body.Grade,
    Unit: req.body.Unit,
    Weight: req.body.Weight,
    Cumulative: req.body.Cumulative,
    SemesterYear: req.body.SemesterYear
  });
  console.log(newGrade);
  

  newGrade.save(function(err) {
    if (!err) { res.send(newGrade)}
    else { res.send({err:'Unable to save grade'}) }
  });


}

// Update a grade by using Student and Course
exports.gradeUpdateOne = function(req, res, next) {
  // console.log(req.body);

  Grade.updateOne({Student: req.body.Student, Course: req.body.Course},{"$set":{
    "Student": req.body.Student,
    "Course": req.body.Course,
    "Grade": req.body.Grade,
    "Unit": req.body.Unit,
    "Weight": req.body.Weight,
    "Cumulative": req.body.Cumulative,
    "SemesterYear": req.body.SemesterYear
  }}, {new : true}, function(err,result){
    if(!err && Grade){
      res.send(result);
    } else {
      res.send({err:'Unable to update grade'});
    }
  })
} 

// Delete a grade by using Student and Course
exports.gradeDeleteOne = function(req, res, next) {
  // console.log(req.body);
  Grade.findOneAndDelete({Student: req.body.Student, Course: req.body.Course},function(err, Grade){
    if(!err && Grade){
      res.send({suc:'Successfully deleted ' + req.body.Student + " " + req.body.Course});
    } else {
      res.send({err:'Unable to delete grade'});
    }
  });
}

// Delete grade collection
exports.gradeDeleteAll = function(req, res, next) {
  // console.log(req.body);
  Grade.deleteMany({},function(err){
    if(!err){
      res.send({suc:'Successfully deleted grades'});
    } else {
      res.send({err:'Unable to delete grades'});
    }
  });
}




// -----------------------------S T U D E N T  S E C T I O N----------------------------------------

// STUDENT SCHEMA
const studentSchema = new Schema({
  StudentID: {type: String, required : true, unique: true},
  FirstName : {type: String, required : true},
  LastName : {type: String, required : true},
  MiddleName : {type: String, required : true},
  Degree: {type: String, required: true},
  Course: {type: String, required: true},
  TotalUnits: {type: Number, required : true},
  TotalUnits2: {type: Number, required: true},
  TotalCumulative: {type: Number, requied: true},
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
  else { res.send({err:'Unable to find student'}) }
});
}

// add student
exports.studentAdd = function(req, res, next) {
  
  var newStudent = new Student({
    StudentID: req.body.StudentID,
    FirstName: req.body.FirstName,
    MiddleName: req.body.MiddleName,
    LastName: req.body.LastName,
    Degree: req.body.Degree,
    Course: req.body.Course,
    TotalUnits: req.body.TotalUnits,
    TotalUnits2: req.body.TotalUnits2,
    TotalCumulative: req.body.TotalCumulative,
    OverallGWA: req.body.OverallGWA
  });
  console.log(newStudent);

  newStudent.save(function(err) {
    if (!err) { res.send(newStudent)}
    else { res.send({err:'Unable to save student'}) }
  });
}

// update student
exports.studentUpdateOne = function(req, res, next) {
Student.updateOne({StudentID: req.body.StudentID},{"$set":{
  "StudentNo.": req.body.StudentID,
  "FirstName": req.body.FirstName,
  "MiddleName": req.body.MiddleName,
  "LastName": req.body.LastName,
  "Degree": req.body.Degree,
  "Course": req.body.Course,
  "TotalUnits": req.body.TotalUnits,
  "TotalUnits2": req.body.TotalUnits2,
  "TotalCumulative": req.body.TotalCumulative,
  "OverallGWA": req.body.OverallGWA  
}}, {new : true}, function(err,result){
  if(!err && Student){
    res.send(result);
  } else {
    res.send({err:'Unable to update student'});
  }
})
}

// delete student
exports.studentDeleteOne = function(req, res, next) {
  // console.log(req.body);
  Student.findOneAndDelete({StudentID: req.body.StudentID},function(err, Student){
    if(!err && Student){
      res.send({suc:'Successfully deleted'});
    } else {
      res.send({err:'Unable to delete student'});
    }
  });
}


// -----------------------------H I S T O R Y  S E C T I O N----------------------------------------

// HISTORY SCHEMA


const historySchema = new Schema({
  User: {type: Schema.Types.ObjectId, ref: 'user', required: true},
  Date : {type: String, required : true},
  Time : {type: String, required : true},
  Description: {type: String, required : true, enum : ['create', 'read', 'update', 'delete']}, // short string ng change na nagyari
  Details: {type: String, required : true}, // long string
}, {autoCreate:true});


// HISTORY MODEL
const History = db.model('history', historySchema);


// find history
exports.historyFindAll = function(req, res, next) {
History.find(function(err, history) {
  if (!err) { res.send(history) }
});
}

exports.historyFindOne = function(req, res, next) {
History.findOne(function(err, History){
  if(!err) {res.send(History);}
  else { res.send({err:'Unable to find history'}) }
});
}

// add history
exports.historyAdd = function(req, res, next) {
  
  var newHistory = new History({
    User: mongoose.Types.ObjectId(req.body.User),
    Date: req.body.Date,
    Time: req.body.Time,
    Description: req.body.Description,
    Details: req.body.Details,
  });
  console.log(newHistory);

  newHistory.save(function(err) {
    User.updateOne({_id:newHistory.User},{$push:{History:newHistory._id}},function(err){
      if(err) console.log("Unable to add history to user "+newHistory.User);
    });
    if (!err) { res.send(newHistory)}
    else { res.send({err:'Unable to save history'}) }
  });
}

// update history
exports.historyUpdateOne = function(req, res, next) {
History.updateOne({User: req.body.User},{"$set":{
  "User": req.body.User,
  "Date": req.body.Date,
  "Time": req.body.Time,
  "Description": req.body.Description,
  "Details": req.body.Details,
},}, {new : true}, function(err,result){
  if(!err && History){
    res.send(result);
  } else {
    res.send({err:'Unable to update history'});
  }
})
}

// delete all history
exports.historyDeleteAll = function(req, res, next) {
  // console.log(req.body);
  User.updateMany({},{"$set":{"History":[]}},function(err, result){
    console.log(result);
  });
  History.deleteMany({},function(err){
    if(!err){
      res.send({suc:'Successfully deleted history'});
    } else {
      res.send({err:'Unable to delete history'});
    }
  });
}

// -----------------------------N O T E  S E C T I O N----------------------------------------
/**
 * Note section
 * Contributors: Carlos Rayel
 * 
 * General tip for backend: use the ids you obtain from 'studentFindOne' and 'userFind'
 * to put into the fields
 */

// NOTE SCHEMA
const noteSchema = new Schema({
  User: {type:mongoose.Types.ObjectId, ref:'user', required:true},
  Student: {type:mongoose.Types.ObjectId, ref:'student', required:true},
  Semester:{type:String, required:true},
  Year:{type:String, required:true},
  Details: {type:String, required:true}
});

// NOTE SCHEMA
const Note = db.model('note',noteSchema);

// ADD NOTE
exports.noteAdd = function(req,res,next){
  var newNote = new Note({
    User:mongoose.Types.ObjectId(req.body.User),
    Student:mongoose.Types.ObjectId(req.body.Student),
    Semester:req.body.Semester,
    Year:req.body.Year,
    Details:req.body.Details
  });
  console.log(newNote);

  newNote.save(function(err){
    if(!err) res.send(newNote);
    else res.send({err:'Unable to add note'});
  });
}

// FIND ONE NOTE BY ID
exports.noteFindOne = function(req,res,next){
  id = mongoose.Types.ObjectId(req.body.id);
  Note.findOne({_id:id},function(err,note){
    console.log(note);
    if(!err) res.send(note)
  });
}

// FIND ALL NOTES
exports.noteFindAll = function(req,res,next){
  Note.find(function(err,notes){
    if(!err) {res.send(notes);}
  });
}

// FIND NOTE BY STUDENT
// returns an array of notes assigned to student
exports.noteFindAllByStudent = function(req,res,next){
  Note.find({$Student:mongoose.Types.ObjectId(req.body.Student)},function(err,notes){
    console.log(notes);
    if(!err) res.send(notes);
  });
}

// UPDATE A NOTE
exports.noteUpdate = function(req,res,next){
  Note.updateOne({_id:mongoose.Types.ObjectId(req.body.id)},{"$set":{
    "Semester":req.body.Semester,
    "Year":req.body.Year,
    "Details":req.body.Details
  }},{new:true},function(err,result){
    if(!err) res.send(result);
    else res.send({err:'Unable to update Note'});
  });
}

// DELETE NOTE BY ID
exports.noteDeleteOne = function(req,res,next){
  Note.deleteOne({_id:mongoose.Types.ObjectId(req.body.id)},function(err){
    if (!err) res.send({suc:'Successfully deleted note'});
    else res.send({err:'Unable to delete note'});
  });
}

// DELETE ALL NOTES
exports.noteDeleteAll = function(req,res,next){
  Note.deleteMany(function(err){
    if (!err) res.send({suc:'Successfully deleted all notes'});
    else res.send({err:'Unable to delete all notes'});
  });
}


// -----------------------------C O U R S E   S E C T I O N----------------------------------------

// COURSE SCHEMA
// const courseSchema = new Schema({
//   CourseName: {type: String, required: true, unique: true},
//   CourseAbbr: {type: String, required: true, unique: true},
//   Units: {type: Number, required: true},
//   CourseType: {type: String, required: true, enum: ['required', 'non-academic', 'electives']}
// },{autoCreate:true});

// COURSE MODEL
// const Course = db.model('course',courseSchema);

/**
 * SECTION : COURSE
 * functions - create/add, read/find, update, delete
 * NOTE: need to change the functions to be specific to the collection (in this case, users)
 */

// create/add course
// exports.courseAdd = function(req, res, next) {
  // UNCOMMENT TO SEE REQUEST CONTENTS AND MAPPING TO USER MODEL
  // console.log(req.body);
  
//   var newCourse = new Course({
//     CourseName: req.body.CourseName,
//     CourseAbbr: req.body.CourseAbbr,
//     Units: req.body.Units,
//     CourseType: req.body.CourseType
//   });
//   console.log(newCourse);

//   newCourse.save(function(err) {
//     if (err) {
//       res.send({err:'Unable to save course'})
//     } else {
//       res.send(newCourse)
//     }
//   });
// }

// find one course
// exports.courseFindOne = function(req, res, next) {
//   Course.findOne((err, course) => {
//     if (err) {
//       res.send({err:'Unable to find course'})
//     } else {
//       res.send(course)
//     }
//   });
// }

// find all course
// exports.courseFindAll = function(req, res, next) {
//   Course.find((err, courses) => {
//     if (err) {
//       res.send({err:'Unable to find all courses'})
//     } else {
//       res.send(courses)
//     }
//   });
// }

// update one course
// exports.courseUpdateOne = function(req, res, next) {
//   Course.updateOne({CourseAbbr: req.body.CourseAbbr}, {"$set":{
//     CourseName: req.body.CourseName,
//     CourseAbbr: req.body.CourseAbbr,
//     Units: req.body.Units,
//     CourseType: req.body.CourseType
//   }}, {new : true}, function(err, result){
//     if (err) {
//       res.send({err:'Unable to update course'});
//     } else {
//       res.send(result);
//     }
//   });
// }

// delete one course
// exports.courseDeleteOne = function(req, res, next) {
//   Course.findOneAndDelete({CourseAbbr: req.body.CourseAbbr}, function(err, Course){
//     if(err) {
//       res.send({err:'Unable to delete course'});
//     } else {
//       res.send({suc:'Successfully deleted ' + Course.CourseAbbr});
//     }
//   });
// }

// -----------------------------D E G R E E  S E C T I O N----------------------------------------

// DEGREE SCHEMA
// const degreeSchema = new Schema({
//   DegreeID: {type: String, required : true, enum : ['BSAMAT', 'BSMATH', 'BSMST', 'BSAPHY', 'BSCS',
//   'BSCHEM', 'BSAGCHEM', 'BSSTAT', 'BSBIO', 'BSSOCIO', 'BAPHILO', 'BACA']},
//   DegreeName: {type: String, required : true},
//   Major: {type: String, required : false},
//   RequiredUnits: {type: Number, required : true},
// },{autoCreate:true});


// DEGREE MODEL
// const Degree = db.model('degree', degreeSchema);


// find degree
// exports.degreeFindAll = function(req, res, next) {
// Degree.find(function(err, degree) {
//   if (!err) { res.send(degree) }
// });
// }

// exports.degreeFindOne = function(req, res, next) {
// Degree.findOne({DegreeID:req.body.DegreeID}, function(err, Degree){
//   if(!err) {res.send(Degree);}
//   else { res.send({err:'Unable to find degree'}) }
// });
// }

// add degree
// exports.degreeAdd = function(req, res, next) {
  
//   var newDegree = new Degree({
//     DegreeID: req.body.DegreeID,
//     DegreeName: req.body.DegreeName,
//     Major: req.body.Major,
//     RequiredUnits: req.body.RequiredUnits
//   });
//   console.log(newDegree);

//   newDegree.save(function(err) {
//     if (!err) { res.send(newDegree)}
//     else { res.send({err:'Unable to save degree'}) }
//   });
// }

// update degree
// exports.degreeUpdateOne = function(req, res, next) {
// Degree.updateOne({DegreeID:req.body.DegreeID},{"$set":{
//   "DegreeID": req.body._id,
//   "DegreeName": req.body.DegreeName,
//   "Major": req.body.Major,
//   "RequiredUnits": req.body.RequiredUnits
// }}, {new : true}, function(err,result){
//   if(!err && Degree){
//     res.send(result);
//   } else {
//     res.send({err:'Unable to update degree'});
//   }
// })
// }

// delete degree
// exports.degreeDeleteOne = function(req, res, next) {
//   // console.log(req.body);
//   Degree.findOneAndDelete({DegreeID:req.body.DegreeID},function(err, Degree){
//     if(!err && Degree){
//       res.send({suc:'Successfully deleted'});
//     } else {
//       res.send({err:'Unable to delete degree'});
//     }
//   });
// }