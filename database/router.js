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
 
  // USER ROUTES
   app.get('/user/find-all', controller.userFindAll);
   app.get('/user/find', controller.userFind);
   app.post('/user/add', controller.userAdd);


   app.delete('/user/delete', controller.userDelete);
   app.delete('/user/delete-all', controller.userDeleteAll);
   app.put('/user/update', controller.userUpdate);

  
  // GRADE ROUTES
   app.get('/grade/find-all', controller.gradeFindAll);
   app.post('/grade/add', controller.gradeAdd);


  // COURSE ROUTES
  app.post('/course/add', controller.courseAdd);
  app.get('/course/find', controller.courseFindOne);
  app.get('/course/find-all', controller.courseFindAll);
  app.put('/course/update', controller.courseUpdateOne);
  app.delete('/course/delete', controller.courseDeleteOne);
}