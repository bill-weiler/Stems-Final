var
  apiRouter = require('express').Router(),
  ctrl      = require('./controllers/expresscontroller')

  apiRouter.route('/clients')
    .get(ctrl.clientController.getAll)
  //   .post(ctrl.clientController.create)
  // apiRouter.route('/clients/:id')
  //   .get(ctrl.clientController.getSingle)
  //   .put(ctrl.clientController.update)
  //   .delete(ctrl.clientController.destroy)


module.exports  = apiRouter
