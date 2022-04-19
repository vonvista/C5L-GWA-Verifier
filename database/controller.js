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

// -----------------------------C O U R S E   S E C T I O N----------------------------------------

// COURSE SCHEMA
const courseSchema = new Schema({
  CourseName: {type: String, required: true, unique: true},
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
    Units: req.body.Units,
    CourseType: req.body.CourseType
  });
  console.log(newCourse);

  newCourse.save(function(err) {
    if (!err) { res.send(newCourse)}
    else { res.send('Unable to save user') }
  });
}

// find one course
exports.courseFindOne = function(req, res, next) {
  Course.findOne((err, course) => {
    if (!err) {res.send(course)}
  });
}

// find all course
exports.courseFindAll = function(req, res, next) {
  Course.find((err, courses) => {
    if (!err) { res.send(courses) }
  });
}

// update one course
exports.courseUpdateOne = function(req, res, next) {
  Course.updateOne({CourseName: req.body.CourseName}, {"$set":{
    CourseName: req.body.CourseName,
    Units: req.body.Units,
    CourseType: req.body.CourseType
  }}, {new : true}, function(err, result){
    if (!err & Course){
      res.send(result);
    } else {
      res.send('Unable to update course');
    }
  });
}

// delete one course
exports.courseDeleteOne = function(req, res, next) {
  Course.findOneAndDelete({CourseName: req.body.CourseName}, function(err, Course){
    if(!err && Course) {
      res.send('Successfully deleted ' + Course.CourseName);
    } else {
      res.send('Unable to delete course');
    }
  });
}