var
  apiRouter = require('express').Router(),
  jwt = require('jsonwebtoken'),
  ctrl = require('./controllers/expresscontroller'),
  secret = 'this is my secret'

apiRouter.route('/signIn')
  .post(ctrl.userController.signIn)

apiRouter.route('/users')
  .post(ctrl.userController.create)

apiRouter.use(function(req, res, next) {
  var token = req.body.token || req.param.token || req.headers['x-access-token']  // 1 - let's check everywhere for the user's token
    // 2 - If we find a token, we will use 'secret' to try and decode it. If it can't be decoded, send the user an error that they don't have the right token
  if (token) {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        return res.status(403).send({success: false, message: "Can't authenticate token"})
          // if it CAN be decoded, save the decoded token to the request, and we'll keep processing the request
      } else {
        req.decoded = decoded; //attaching token to the body and passing it along to the next function for use
        next()
      }
    })
  } else {
    return res.status(403).send({success: false, message: "no token provided"})
  }
})

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

apiRouter.route('/me')
  .get(function (req, res){
    res.send(req.decoded)
  })




module.exports = apiRouter
