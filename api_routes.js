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
    .get(ctrl.clientController.getAll)
    .post(ctrl.clientController.createNewTodo)
    .delete(ctrl.clientController.destroy)

module.exports  = apiRouter
