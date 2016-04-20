var
  apiRouter = require('express').Router(),
  jwt       = require('jsonwebtoken'),
  ctrl      = require('./controllers/expresscontroller'),
  secret    = 'this is my secret'

  apiRouter.route('/signIn')
    .post(ctrl.userController.signIn)

  apiRouter.route('/users')
    .post(ctrl.userController.create)

  apiRouter.use(function(req, res, next){
     // this is going to run EVERY TIME someone goes to a url that starts with /api
     // so we should probably check to see if they are logged in here
    console.log("someone is visiting our API, we should check to see if they are logged in")
     // ...and then we'll let the request continue on to our app:
     next()
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





module.exports  = apiRouter
