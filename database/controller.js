/**
 * NOTE: This is a copy of my controller.js in exer 10 in CMSC 100.
 * WIP: DO NOT USE AS-IS
 * Carlos Angelo L. Rayel | 19-04-2022
 */

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// collection for users
// name of the database will be BALANGKAS
const db = mongoose.createConnection('mongodb://localhost:27017/KALATAS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

// Schemas
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
  User.find((err, users) => {
    if (!err) { res.send(users) }
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
  console.log(newUser);
  

  newUser.save(function(err) {
    if (!err) { res.send(newUser)}
    else { res.send('Unable to save user') }
  });
}

// -----------------------------G R A D E S   S E C T I O N----------------------------------------

// GRADE SCHEMA
const gradeSchema = new Schema({
  Value: {type: String, required: true},
  Year: {type: String, required: true},
  Semester: {type: String, required: true}
},{autoCreate:true})

// GRADE MODEL
const Grade = db.model('grade', gradeSchema);

/**
 * SECTION : grades
 * functions - findAll, add
 */

// Find all grades
exports.gradeFindAll = function(req, res, next) {
  Grade.find((err, grades) => {
    if (!err) { res.send(grades) }
  });
}

// Add grade
exports.gradeAdd = function(req, res, next) {
  // UNCOMMENT TO SEE REQUEST CONTENTS AND MAPPING TO USER MODEL
  // console.log(req.body);
  
  var newGrade = new Grade({
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