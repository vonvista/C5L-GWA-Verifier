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
const userSchema = new Schema({
    Username : {type: String, required : true, unique: true},
    First_name : {type: String, required : true},
    Last_name : {type: String, required : true},
    Middle_name : {type: String, required : true},
    Position : {type: String, required : true},
    Role : {type: String, required : true, enum : ['user','admin']},
    Password : {type: String, required : true}
  },{autoCreate:true});

// models for the database
// NOTE: creating a model with a unique attribute will cause mongoose to auto-create a collection for the model
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
exports.findAll = (req, res, next) => {
  User.find((err, users) => {
    if (!err) { res.send(users) }
  })
}

// add user
exports.add = (req, res, next) => {
  // UNCOMMENT TO SEE REQUEST CONTENTS AND MAPPING TO USER MODEL
  // console.log(req.body);
  // console.log(newUser);

  var newUser = new User({
    Username: req.body.Username,
    First_name: req.body.First_name,
    Middle_name: req.body.Middle_name,
    Last_name: req.body.Last_name,
    Position: req.body.Position,
    Role: req.body.Role,
    Password: req.body.Password
  });


  newUser.save((err) => {
    if (!err) { res.send(newUser)}
    else { res.send('Unable to save user') }
  })
}
