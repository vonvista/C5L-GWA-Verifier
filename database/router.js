/**
 * NOTE: This is from a copy of my router.js in exer 10 in CMSC 100
 * WIP DO NOT USE AS IS
 * Carlos Angelo L. Rayel | 19-04-2022
 */

const controller = require('./controller');

module.exports = (app) => {

  // Allow Cross Origin Resource Sharing
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
  })

  /**
   * methods:
   * format: app.<method>('<url>',controller.<controller_method>)
   * 
   * app.get, app.post, app.delete, app.put
   */
   app.get('/login-toggle', controller.LoginUpdate)
   app.get('/logged-in', controller.loggedIn)
 
   app.get('/find-all-posts', controller.findAllPosts)
   app.get('/find-by-id-post', controller.findByIdPOST)
   app.get('/find-by-author', controller.findByAuthor)
   app.post('/post', controller.post)
   app.delete('/delete-post-by-id', controller.deletePostById)
   app.put('/edit-post-by-id', controller.findPostAndUpdate)
 
   app.get('/find-all', controller.findAll)
   app.get('/find-by-id', controller.findById)
   app.get('/find-by-form', controller.findByForm)
   app.post('/add', controller.add)
   app.post('/delete-by-id', controller.deleteById)
}