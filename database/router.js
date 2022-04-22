/**
 * ROUTER
 * File for the url routes for accessing the database functions
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

  // DEGREE ROUTES
  app.post('/degree/add', controller.degreeAdd);
  app.get('/degree/find', controller.degreeFindOne);
  app.get('/degree/find-all', controller.degreeFindAll);
  app.put('/degree/update', controller.degreeUpdateOne);
  app.delete('/degree/delete', controller.degreeDeleteOne);

  
  // STUDENT ROUTES
  app.post('/student/add', controller.studentAdd);
  app.get('/student/find', controller.studentFindOne);
  app.get('/student/find-all', controller.studentFindAll);
  app.put('/student/update', controller.studentUpdateOne);
  app.delete('/student/delete', controller.studentDeleteOne);

  
  // USER ROUTES
  app.get('/user/find-all', controller.userFindAll);
  app.get('/user/find', controller.userFind);
  app.get('/user/login', controller.userLogin);
  app.post('/user/add', controller.userAdd);


  app.delete('/user/delete', controller.userDelete);
  app.delete('/user/delete-all', controller.userDeleteAll);
  app.put('/user/update', controller.userUpdate);

  
  // GRADE ROUTES
  app.get('/grade/find-all', controller.gradeFindAll);
  app.post('/grade/add', controller.gradeAdd);
  app.get('/grade/find', controller.gradeFindOne);
  app.delete('/grade/delete-all', controller.gradeDeleteAll);
  app.put('/grade/update', controller.gradeUpdateOne);
  app.delete('/grade/delete', controller.gradeDeleteOne);

  
  // COURSE ROUTES
  app.post('/course/add', controller.courseAdd);
  app.get('/course/find', controller.courseFindOne);
  app.get('/course/find-all', controller.courseFindAll);
  app.put('/course/update', controller.courseUpdateOne);
  app.delete('/course/delete', controller.courseDeleteOne);

}