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

  // DEGREE ROUTES
  app.post('/degree/add', controller.degreeAdd);
  app.get('/degree/find', controller.degreeFindOne);
  app.get('/degree/find-all', controller.degreeFindAll);
  app.put('/degree/update', controller.degreeUpdateOne);

   // STUDENT ROUTES
   app.post('/student/add', controller.studentAdd);
   app.get('/student/find', controller.studentFindOne);
   app.get('/student/find-all', controller.studentFindAll);
   app.put('/student/update', controller.studentUpdateOne);
}