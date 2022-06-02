/**
 * CONTROLLER
 * controller file to hold the functions of the database
 */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema;

saltRounds = 8; // number of rounds to hash the password

//console.log();

// name of the database will be KALATAS
const db = mongoose.createConnection(`mongodb://127.0.0.1:27017/KALATAS`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


exports.middleware = async function(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.send({err:'No auth headers given'});
    return
  } 

  var username = authHeader.split(' ')[1];
  var password = authHeader.split(' ')[2];
  
  //console.log(username, password)
  //get rid of extra spaces on password
  const user = await User.findOne({Username: username});
  if(user){
    if(user.Password === password){
      next();
    } else {
      res.send({err:'Failed to authenticate'});
      //console.log("HERE")
    }
  }
  else {
    res.send({err:'Failed to authenticate'});
    //console.log("HERE")
  }
}

//create admin account
exports.adminCreate = async function(req, res, next) {

  var hashedPassword = await bcrypt.hash('admin', saltRounds); //encrpyt password first -vov

  const admin = new User({
    Username: "admin",
    FirstName: "Admin",
    MiddleName: "_",
    LastName: "User",
    Position: "Chairman",
    Role: "admin",
    Password: hashedPassword,
    History:[]
  })
  
  //save
  admin.save(function(err) {
    // if (!err) { res.send(admin)}
    // else { res.send({err:'Unable to save user'}) }
  });
}

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
  //console.log(newUser);

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
exports.userUpdate = async function(req, res, next) {
  // console.log(req.body);

  var hashedPassword

  if(req.body.Password){
    hashedPassword = await bcrypt.hash(req.body.Password, saltRounds); //encrpyt password first -vov
  }
  else {
    //set to old password, find old password by user _id
    hashedPassword = await User.findOne({_id:req.body._id}).then(function(user){
      return user.Password;
    });
  }

  // var hashedPassword = await bcrypt.hash(req.body.Password, saltRounds); //encrpyt password first -vov
  User.updateOne({_id: mongoose.Types.ObjectId(req.body._id)},{"$set":{
    "Username" : req.body.Username,
    "FirstName": req.body.FirstName,
    "MiddleName": req.body.MiddleName,
    "LastName": req.body.LastName,
    "Position": req.body.Position,
    // "Role": req.body.Role,    <- removed - vov
    "Password": hashedPassword,
  }}, {new : true}, function(err,result){
    if(!err && User){
      //send the updated user
      User.findOne({_id: mongoose.Types.ObjectId(req.body._id)}, function(err, User){
        if(!err && User){
          res.send(User);
        }
      });
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
  Semyear : {type:String,required:true},
},{autoCreate:true, timestamps:true})

// GRADE MODEL
const Grade = db.model('grade', gradeSchema);

// COMBINATION OF STUDENT AND COURSE ID IS UNIQUE
//gradeSchema.index({Student: 1, Course: 1} , {unique: true});

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

exports.gradeFindByStudent = function(req,res,next){
  // requires student ObjectId
  Grade.find({Student:mongoose.Types.ObjectId(req.body.Student)}, null, {sort: {'_id': 1}},function(err,grades){
    if(grades) {
      res.send(grades);
    }
    else {
      res.send({err:'Unable to find grades'})
    }
  })
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
    Semyear : req.body.Semyear,
  });
  //console.log(newGrade);

  newGrade.save(function(err) {
    if (!err) { res.send(newGrade)}
    else { res.send({err:'Unable to save grade'}) }
  });

}

// Add grade many -vov
exports.gradeAddMany = function(req, res, next) {
  // UNCOMMENT TO SEE REQUEST CONTENTS AND MAPPING TO USER MODEL
  // console.log(req.body);
  grades = req.body.Grades;
  gradesArray = [];

  //loop through grades and add each one
  for(var i = 0; i < grades.length; i++){
    var newGrade = new Grade({
      Student: mongoose.Types.ObjectId(grades[i].Student),
      Course: grades[i].Course,
      Grade: grades[i].Grade, 
      Unit: grades[i].Unit,
      Weight: grades[i].Weight,
      Cumulative: grades[i].Cumulative,
      Semyear : grades[i].Semyear,
    });
    gradesArray.push(newGrade);
  }
  //console.log(gradesArray);

  // var newGrade = new Grade({
  //   Student: mongoose.Types.ObjectId(req.body.Student),
  //   Course: req.body.Course,
  //   Grade: req.body.Grade,
  //   Unit: req.body.Unit,
  //   Weight: req.body.Weight,
  //   Cumulative: req.body.Cumulative,
  //   Semester: req.body.Semester,
  //   Year: req.body.Year
  // });
  // console.log(newGrade);
  
  Grade.insertMany(gradesArray, function(err,result){
    if(!err){
      res.send(result);
    } else {
      //console.log(err);
      res.send({err:'Unable to add grade'});
    }
  })
}

// Update a grade by using Student and Course
exports.gradeUpdateOne = function(req, res, next) {
  //console.log(req.body);

  Grade.updateOne({_id: mongoose.Types.ObjectId(req.body._id)},{"$set":{
    "Student": req.body.Student,
    "Course": req.body.Course,
    "Grade": req.body.Grade,
    "Unit": req.body.Unit,
    "Weight": req.body.Weight,
    "Cumulative": req.body.Cumulative,
    "Semyear" : req.body.Semyear
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
  Grade.findOneAndDelete({_id: mongoose.Types.ObjectId(req.body._id)},function(err, Grade){
    if(!err && Grade){
      res.send({suc:'Successfully deleted '});
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
  // Course: {type: String, required: true},    <- highly likely uneeded property
  TotalUnits: {type: Number, required : true},
  TotalUnits2: {type: Number, required: true},
  TotalCumulative: {type: Number, requied: true},
  OverallGWA: {type: Number, required : true},
  Status: {type: String, required : true, enum:['Checked','Unchecked','Pending']},
  Validations: [{type: Boolean, required : true}],
},{autoCreate:true});



// STUDENT MODEL
const Student = db.model('student', studentSchema);


// find student
exports.studentFindAll = function(req, res, next) {
Student.find(function(err, student) {
  if (!err) { res.send(student) }
});
}

exports.studentFindOne = async function(req, res, next) {
  var student = await Student.findOne({StudentID:req.body.StudentID})
  if(student) {
    res.send(student);
  }
  else { 
    res.send({err:'Unable to find student'}); 
  }
}

//student update status
exports.studentUpdateStatus = async function(req, res, next) {
  
  //find student by StudentID
  var student = await Student.findOne({StudentID:req.body.StudentID});
  if(!student){
    res.send({err:'Unable to find student'}); 
    return
  }

  if (student.Status == 'Unchecked'){
    student.Status = 'Pending';
  }
  
  //save
  student.save(function(err) {
    if (!err) { res.send(student)}
    else { res.send({err:'Unable to save student'}) }
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
    OverallGWA: req.body.OverallGWA,
    Status: req.body.Status,
    Validations: req.body.Validations
  });
  //console.log(newStudent);

  newStudent.save(function(err) {
    if (!err) { res.send(newStudent)}
    else { res.send({err:'Unable to save student'}) }
  });
}

// update student
exports.studentUpdateOne = function(req, res, next) {
  Student.updateOne({_id:mongoose.Types.ObjectId(req.body._id)},{"$set":{
    "StudentID": req.body.StudentID,
    "FirstName": req.body.FirstName,
    "MiddleName": req.body.MiddleName,
    "LastName": req.body.LastName,
    "Degree": req.body.Degree,
    "Course": req.body.Course,
    "TotalUnits": req.body.TotalUnits,
    "TotalUnits2": req.body.TotalUnits2,
    "TotalCumulative": req.body.TotalCumulative,
    "OverallGWA": req.body.OverallGWA,
    "Status": req.body.Status
  }}, {new : true}, function(err,result){
    if(!err && Student){
      res.send(result);
    } else {
      res.send({err:'Unable to update student'});
    }
  })
}


// update student cumulative, overallgwa, totalunits
exports.studentUpdateGPA = function(req, res, next) {
  //console.log(req.body);
  Student.updateOne({_id:mongoose.Types.ObjectId(req.body._id)},{"$set":{
    "TotalUnits": req.body.TotalUnits,
    "TotalCumulative": req.body.TotalCumulative,
    "OverallGWA": req.body.OverallGWA,
  }}, {new : true}, function(err,result){
    if(!err && Student){
      res.send(result);
    } else {
      res.send({err:'Unable to update student totalunits, cumulative, gwa'});
    }
  })
}


// delete student
exports.studentDeleteOne = async function(req, res, next) {
  //console.log(req.body);
  var studentKey;

  var student = await Student.findOne({StudentID: req.body.StudentID});
  if(student){
    studentKey = student._id;
  } else {
    res.send({err:'Unable to find student'});
    return
  }

  Student.findOneAndDelete({StudentID: req.body.StudentID},function(err, Student){
    if(!err && Student){
      // res.send({suc:'Successfully deleted'});
      // get student key from student
    } else {
      res.send({err:'Unable to delete'});
      return
    }
  });

  Grade.deleteMany({Student: mongoose.Types.ObjectId(studentKey)},function(err, Student){
    if(!err && Student){
      res.send({suc:'Successfully deleted'});
    } else {
      res.send({err:'Unable to delete'});
    }
  });
}

//update validations
exports.studentUpdateValidations = function(req, res, next) {
  //console.log(req.body);
  Student.updateOne({_id: mongoose.Types.ObjectId(req.body._id)},{"$set":{
    "Validations": req.body.Validations
  }}, {new : true}, function(err,result){
    if(!err && Student){
      //check if all validations are true
      var allTrue = true;
      for(var i = 0; i < req.body.Validations.length; i++){
        if(req.body.Validations[i] == false){
          allTrue = false;
        }
      }
      if(allTrue){
        Student.updateOne({_id: mongoose.Types.ObjectId(req.body._id)},{"$set":{
          "Status": 'Checked'
        }}, {new : true}, function(err,result){
          if(!err && Student){
            res.send({suc: "Checked"});
          }
        });
      }
      else {
        Student.updateOne({_id: mongoose.Types.ObjectId(req.body._id)},{"$set":{
          "Status": 'Pending'
        }}, {new : true}, function(err,result){
          if(!err && Student){
            res.send({suc: "Pending"});
          }
        });
      }
      
    } else {
      res.send({err:'Unable to update student'});
    }
  })
}


// -----------------------------H I S T O R Y  S E C T I O N----------------------------------------

// HISTORY SCHEMA


const historySchema = new Schema({
  User: {type: String, required: true},
  Student: {type: String, required: true},
  Date : {type: String, required : true},
  Time : {type: String, required : true},
  Description: {type: String, required : true},
  Details: {type: String, required : true}, // long string
  HasImage: {type: Boolean, required : true},
  Image: {type: String},
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

exports.historyFindByStudent = async function(req, res, next){
  History.find({Student:req.body.Student},function(err,histories)
  {
    if (!err) {
      //do not send Image
      for(var i = 0; i < histories.length; i++){
        histories[i].Image = undefined;
      }
      res.send(histories);
    }
  })
}

exports.historyFindImage = async function(req, res, next){
  if(!req.body._id){
    res.send({err:'No id'});
    return;
  }
  History.findOne({_id:req.body._id},function(err,history)
  {
    if (!err) {
      res.send({suc: history.Image});
      
    }
    else {
      res.send({err:'No image'})
    }
  })
}

// add history
exports.historyAdd = function(req, res, next) {
  
  var newHistory = new History({
    User: req.body.User,
    Student: req.body.Student,
    Date: req.body.Date,
    Time: req.body.Time,
    Description: req.body.Description,
    Details: req.body.Details,
    Image: req.body.Image,
    HasImage: req.body.HasImage,
  });
  // console.log(newHistory);

  // newHistory.save(function(err) {
  //   User.updateOne({_id:newHistory.User},{$push:{History:newHistory._id}},function(err){
  //     if(err) console.log("Unable to add history to user "+newHistory.User);
  //   });
  //   if (!err) { res.send(newHistory)}
  //   else { res.send({err:'Unable to save history'}) }
  // });

  // just saves normally to history collections -lal
  newHistory.save(function(err) {
    if (!err) { res.send(newHistory)}
    else { res.send({err:'Unable to save history'}) }
  });
}

// update history
exports.historyUpdateOne = function(req, res, next) {
History.updateOne({User: req.body.User},{"$set":{
  "User": req.body.User,
  "Student": req.body.Student,
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
    //console.log(result);
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
  User: {type:String, required:true},
  Student: {type:mongoose.Types.ObjectId, ref:'student', required:true},
  // Semester: {type:String, required:true},
  // Year:{type:String, required:true},
  Semyear: {type:String, required:true},
  Details: {type:String, required:true},
},{timestamps:true});

// NOTE SCHEMA
const Note = db.model('note',noteSchema);

// ADD NOTE
exports.noteAdd = function(req,res,next){
  var newNote = new Note({
    User:req.body.User,
    Student:mongoose.Types.ObjectId(req.body.Student),
    // Semester:req.body.Semester,
    // Year:req.body.Year,
    Semyear:req.body.Semyear,
    Details:req.body.Details
  });
  //console.log(newNote);

  newNote.save(function(err){
    if(!err) res.send(newNote);
    else res.send({err:'Unable to add note'});
  });
}

// FIND ONE NOTE BY ID
exports.noteFindOne = function(req,res,next){
  id = mongoose.Types.ObjectId(req.body.id);
  Note.findOne({_id:id},function(err,note){
    //console.log(note);
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
  Note.find({Student:mongoose.Types.ObjectId(req.body.Student)},function(err,notes){
    //console.log(notes);
    if(!err) res.send(notes);
  });
}

// UPDATE A NOTE
exports.noteUpdate = function(req,res,next){
  Note.updateOne({Student:mongoose.Types.ObjectId(req.body.Student), Semyear:req.body.Semyear},{"$set":{
    // "Semyear":req.body.Semester,
    // "Year":req.body.Year,
    "User":req.body.User,
    "Student":req.body.Student,
    "Semyear":req.body.Semyear,
    "Details":req.body.Details,
  }},{upsert:true},function(err,result){
    if(!err) res.send(result);
    else res.send({err:'Unable to update Note'});
  });
}

// DELETE NOTE BY ID
exports.noteDeleteOne = function(req,res,next){
  Note.deleteOne({Student:mongoose.Types.ObjectId(req.body.Student), Semyear:req.body.Semyear}, {justOne:true}, function(err,result){
    if (!err) res.send(result);
  });
}

// DELETE ALL NOTES
exports.noteDeleteAll = function(req,res,next){
  Note.deleteMany(function(err){
    if (!err) res.send({suc:'Successfully deleted all notes'});
    else res.send({err:'Unable to delete all notes'});
  });
}

// RESET ALL TABLES
exports.resetAll = async function(req,res,next)  {

  // Clear history first from users
  // User.updateMany({},{"$set":{"History":[]}},function(err, result){
  //   //console.log(result);
  // });

  // Delete history
  History.deleteMany({},function(err){
    if(!err){
    } else {
    }
  });

  // Delete users
  User.deleteMany({},function(err){
    if(!err){
    } else {
    }
  });

  // Delete grades
  Grade.deleteMany({},function(err){
    if(!err){
    } else {
    }
  });

  // Delete students
  Student.deleteMany({},function(err){
    if(!err){
    } else {
    }
  });

  // Delete notes
  Note.deleteMany(function(err){
    if(!err){
    } else {
    }
  });

  var hashedPassword = await bcrypt.hash('admin', saltRounds); //encrpyt password first -vov

  const admin = new User({
    Username: "admin",
    FirstName: "Admin",
    MiddleName: "_",
    LastName: "User",
    Position: "Chairman",
    Role: "admin",
    Password: hashedPassword,
    History:[]
  })
  
  //save
  await admin.save(function(err) {
    // if (!err) { res.send(admin)}
    // else { res.send({err:'Unable to save user'}) }
  });

  res.send({suc:'Successfully reset all collections'});
}

// -----------------------------C O U R S E   S E C T I O N----------------------------------------
// NOW DEPRICATED

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
// NOW DEPRICATED

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