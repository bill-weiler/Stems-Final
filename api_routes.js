var
  apiRouter = require('express').Router(),
  ctrl      = require('./controllers/expresscontroller')

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

  apiRouter.route('/users')
    .post(ctrl.userController.create)

  apiRouter.route('/signIn')
    .post(ctrl.userController.signIn)



module.exports  = apiRouter
