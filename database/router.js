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
  app.post('/history/add', controller.historyAdd);
  app.post('/history/find', controller.historyFindOne);
  app.post('/history/find-by-student', controller.historyFindByStudent);
  app.get('/history/find-all', controller.historyFindAll);
  app.put('/history/update', controller.historyUpdateOne);
  app.delete('/history/delete-all', controller.historyDeleteAll);
  
  // STUDENT ROUTES
  app.post('/student/add', controller.studentAdd);
  app.post('/student/find', controller.studentFindOne);
  app.get('/student/find-all', controller.studentFindAll);
  app.post('/student/update', controller.studentUpdateOne);
  app.delete('/student/delete', controller.studentDeleteOne);

  
  // USER ROUTES
  app.get('/user/find-all', controller.userFindAll);
  app.post('/user/find', controller.userFind);
  app.post('/user/add', controller.userAdd);

  app.delete('/user/delete', controller.userDelete);
  app.delete('/user/delete-all', controller.userDeleteAll);
  app.post('/user/update', controller.userUpdate);

  app.post('/user/login', controller.userLogin);

  
  // GRADE ROUTES
  app.get('/grade/find-all', controller.gradeFindAll);
  app.get('/grade/find-by-student', controller.gradeFindByStudent);
  app.post('/grade/add', controller.gradeAdd);
  app.post('/grade/find', controller.gradeFindOne);
  app.delete('/grade/delete-all', controller.gradeDeleteAll);
  app.put('/grade/update', controller.gradeUpdateOne);
  app.delete('/grade/delete', controller.gradeDeleteOne);

  // NOTE ROUTES
  app.post('/note/add', controller.noteAdd);
  app.post('/note/find', controller.noteFindOne);
  app.get('/note/find-all', controller.noteFindAll);
  app.post('/note/find-by-student', controller.noteFindAllByStudent);
  app.put('/note/update', controller.noteUpdate);
  app.delete('/note/delete', controller.noteDeleteOne);
  app.delete('/note/delete-all', controller.noteDeleteAll);
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