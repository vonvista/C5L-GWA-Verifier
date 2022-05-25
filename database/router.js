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

  // HISTORY ROUTES
  app.post('/history/add', controller.middleware, controller.historyAdd);
  app.post('/history/find', controller.middleware, controller.historyFindOne);
  app.post('/history/find-by-student', controller.middleware, controller.historyFindByStudent);
  app.get('/history/find-all', controller.middleware, controller.historyFindAll);
  app.put('/history/update', controller.middleware, controller.historyUpdateOne);
  app.delete('/history/delete-all', controller.middleware, controller.historyDeleteAll);
  
  // STUDENT ROUTES
  app.post('/student/add', controller.middleware, controller.studentAdd);
  app.post('/student/find', controller.middleware, controller.studentFindOne);
  app.get('/student/find-all', controller.middleware, controller.studentFindAll);
  app.post('/student/update', controller.middleware, controller.studentUpdateOne);
  app.delete('/student/delete', controller.middleware, controller.studentDeleteOne);
  app.post('/student/update-validations', controller.middleware, controller.studentUpdateValidations);
  app.post('/student/update-gpa', controller.middleware, controller.studentUpdateGPA);

  
  // USER ROUTES
  app.get('/user/create-admin', controller.adminCreate);

  app.get('/user/find-all', controller.middleware, controller.userFindAll);
  app.post('/user/find', controller.middleware, controller.userFind);
  app.post('/user/add', controller.middleware, controller.userAdd);

  app.delete('/user/delete', controller.middleware, controller.userDelete);
  app.delete('/user/delete-all',  controller.middleware, controller.userDeleteAll);
  app.post('/user/update', controller.middleware, controller.userUpdate);

  app.post('/user/login', controller.userLogin);
  
  // GRADE ROUTES
  app.get('/grade/find-all', controller.middleware, controller.gradeFindAll);
  app.post('/grade/find-by-student', controller.middleware, controller.gradeFindByStudent);
  app.post('/grade/add', controller.middleware, controller.gradeAdd);
  app.post('/grade/add-many', controller.middleware, controller.gradeAddMany);
  app.post('/grade/find', controller.middleware, controller.gradeFindOne);
  app.delete('/grade/delete-all', controller.middleware, controller.gradeDeleteAll);
  app.post('/grade/update', controller.middleware, controller.gradeUpdateOne);
  app.post('/grade/delete', controller.middleware, controller.gradeDeleteOne);

  // NOTE ROUTES
  app.post('/note/add', controller.middleware, controller.noteAdd);
  app.post('/note/find',  controller.middleware, controller.noteFindOne);
  app.get('/note/find-all', controller.middleware, controller.noteFindAll);
  app.post('/note/find-by-student', controller.middleware, controller.noteFindAllByStudent);
  app.post('/note/update', controller.middleware, controller.noteUpdate);
  app.post('/note/delete', controller.middleware, controller.noteDeleteOne);
  app.delete('/note/delete-all', controller.middleware, controller.noteDeleteAll);

  // RESET TABLES ROUTE
  app.delete('/database/reset-all', controller.resetAll);
}
  
  // COURSE ROUTES
  // app.post('/course/add', controller.courseAdd);
  // app.get('/course/find', controller.courseFindOne);
  // app.get('/course/find-all', controller.courseFindAll);
  // app.put('/course/update', controller.courseUpdateOne);
  // app.delete('/course/delete', controller.courseDeleteOne);

  // DEGREE ROUTES
  // app.post('/degree/add', controller.degreeAdd);
  // app.get('/degree/find', controller.degreeFindOne);
  // app.get('/degree/find-all', controller.degreeFindAll);
  // app.put('/degree/update', controller.degreeUpdateOne);
  // app.delete('/degree/delete', controller.degreeDeleteOne);