var
  apiRouter = require('express').Router(),
  jwt = require('jsonwebtoken'),
  ctrl = require('./controllers/expresscontroller'),
  secret = 'this is my secret'

apiRouter.route('/signIn')
  .post(ctrl.userController.signIn)

apiRouter.route('/users')
  .post(ctrl.userController.create)

// apiRouter.use(function(req, res, next) {
//   // 1 - let's check everywhere for the user's token
//   var token = req.body.token || req.param.token || req.headers['x-access-token']
//     // 2 - If we find a token, we will use 'secret' to try and decode it. If it can't be decoded, send the user an error that they don't have the right token
//   if (token) {
//     jwt.verify(token, secret, function(err, decoded) {
//       if (err) {
//         return res.status(403).send({success: false, message: "Can't authenticate token"})
//           // if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request
//       } else {
//         req.decoded = decoded; //attaching token to the body and passing it along to the next function for use
//         next()
//       }
//     })
//   } else {
//     // 3 - If we can't find a token at all, we'll just send back an error message
//     return res.status(403).send({success: false, message: "no token provided"})
//   }
// })
// apiRouter.route('/api/v1/stemsApp/me')
//   .get(ctrl.userController.getAll)

apiRouter.route('/clients')
  .get(ctrl.clientController.getAll)
  .post(ctrl.clientController.createNewClient)
apiRouter.route('/clients/:id')
  .get(ctrl.clientController.getSingleClient)
  .put(ctrl.clientController.update)
  .delete(ctrl.clientController.destroy)

apiRouter.route('/todos')
  .get(ctrl.todoController.getAll)
  .post(ctrl.todoController.createNewTodo)
apiRouter.route('/todos/:id')
  .delete(ctrl.todoController.destroy)





module.exports = apiRouter
