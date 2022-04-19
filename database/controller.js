/**
 * NOTE: This is a copy of my controller.js in exer 10 in CMSC 100.
 * WIP: DO NOT USE AS-IS
 * Carlos Angelo L. Rayel | 19-04-2022
 */

const mongoose = require('mongoose')

// used to create a connection to the collection SOCMEDIA
const userbase = mongoose.createConnection('mongodb://localhost:27017/SOCMEDIA', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
// used to create a connection to the collection FEEDPOSTS
const posts = mongoose.createConnection('mongodb://localhost:27017/FEEDPOSTS', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// models for the database
const User = userbase.model('User', {
  fname:String,
  lname:String,
  email:String,
  password:String,
  login:Boolean
})

const Post = posts.model('Post', {
  author:String,
  content:String,
  timestamp:Date
})


/**
 * METHODS
 * format: exports.<function_name> = (req, res, next) => {
 * <code>
 * }
 */
// Posts feed section
exports.findAllPosts = (req, res, next) => {
  Post.find((err, posts) => {
    if(!err){res.send(posts)}
  })
}
exports.findByAuthor = (req, res, next) => {
  if (!req.query.id) { return res.send('No id provided') }

  Post.findOne({ _id: req.query.id}, (err, Post) => {
    if (!err) { res.send(User) }
  })
}

exports.post = (req, res, next) => {
  // console.log(req.body)

  var newPost = new Post({
    author: req.body.author,
    content: req.body.content,
    timestamp: req.body.timestamp
  })

  newPost.save((err) => {
    if (!err) { res.send(newPost)}
    else { res.send('Unable to save Post') }
  })
}

exports.findByIdPOST = (req, res, next) => {
  // console.log(req.query.id)
  if (!req.query.id) { return res.send('No id provided') }

  User.findOne({ _id: req.query.id}, (err, User) => {
    if (!err) { res.send(User) }
  })
}

exports.deletePostById = (req, res, next) => {
  // console.log(req.body.id)
  Post.findOneAndDelete({_id: req.body.id},{}, (err, post) => {
    if (!err && post) {
      res.send('Successfully deleted ' + post.id)
    }
    else {
      res.send('Unable to delete Post')
    }
  })
}

exports.findPostAndUpdate = (req, res, next) => {
  // console.log(req.body)
  Post.updateOne({_id: req.body.id},{
    "$set": {
      "content": req.body.content,
      "timestamp": req.body.timestamp
    }
  }, {new: true}, (err, result) => {
    if (!err) res.json(result)
  })
}

// Userbase section
exports.findAll = (req, res, next) => {
  User.find((err, users) => {
    if (!err) { res.send(users) }
  })
}

exports.findById = (req, res, next) => {
  if (!req.query.id) { return res.send('No id provided') }

  User.findOne({ _id: req.query.id}, (err, User) => {
    if (!err) { res.send(User) }
  })
}

exports.findByForm = (req, res, next) => {
  if (!req.query.email) {return res.send('Insufficient data provided')}

  User.findOne({email: req.query.email} , (err, User) => {
    if(!err) {res.send(User)}
  })
}


exports.add = (req, res, next) => {
  // console.log(req.body)

  var newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    login: req.body.login
  })

  newUser.save((err) => {
    if (!err) { res.send(newUser)}
    else { res.send('Unable to save User') }
  })
}

exports.deleteById = (req, res, next) => {
  User.findOneAndDelete({ _id: req.body.id }, (err, User) => {
    if (!err && User) {
      res.send('Successfully deleted ' + User.email)
    }
    else {
      res.send('Unable to delete User')
    }
  })
}

exports.LoginUpdate = (req, res, next) => {
  // console.log(req.query.login)
  let status = req.query.login
  // console.log(status)  
    User.updateOne({_id: req.query.id},{
      "$set": {"login":status}
    },(err, result) => {
      if(!err)res.json(result)
    })
    User.findOne({_id: req.query.id}, (err, User) => {
      if(!err) {
        console.log(User)
      }
    })
}

exports.loggedIn = (req, res, next) => {  
  User.findOne({login: true}, (err, User) => {
    // console.log(User)
    if(!err) {res.send(User)}
  })
}
