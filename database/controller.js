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

// delete degree
exports.degreeDeleteOne = function(req, res, next) {
  // console.log(req.body);
  Degree.findOneAndDelete({DegreeID:req.body.DegreeID},function(err, Degree){
    if(!err && Degree){
      res.send('Successfully deleted');
    } else {
      res.send('Unable to delete degree');
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
Student.updateOne({StudentID: req.body.StudentID},{"$set":{
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

// delete student
exports.studentDeleteOne = function(req, res, next) {
  // console.log(req.body);
  Student.findOneAndDelete({StudentID: req.body.StudentID},function(err, Student){
    if(!err && Student){
      res.send('Successfully deleted');
    } else {
      res.send('Unable to delete student');
    }
  });
}