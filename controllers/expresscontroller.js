var db = require('../models/schemas')

module.exports = {

  //==================================================================\\
  //                    BEGIN CLIENT CONTROLLER                       \\
  //==================================================================\\
  clientController: {

    getAll: function(req, res) {
      db.Client.find({}, function(err, clients) {
        if (err) {
          res.json(err)
        } else {
          console.log('Express: getting all clients')
          res.json(clients)
        }
      })
    },

    getSingleClient: function(req, res) {
      db.Client.findOne({
        _id: req.params.id
      }, function(err, client) {
        if (err) {
          res.json(err)
        } else {
          console.log('Express: getting a single client')
          res.json(client)
        }
      })
    },

    createNewClient: function(req, res) {
      var client = new db.Client(req.body)
      client.save(function(err, client) {
        if (err) res.json(err)
        console.log('Express: adding a new client')
        res.json(client)
      })
    },

    update: function(req, res) {
      db.Client.findOneAndUpdate({
        _id: req.params.id
      }, req.body, {
        new: true
      }, function(err, client) {
        console.log('Express: updating client');
        res.json(client)
      })
    },

    destroy: function(req, res) {
      db.Client.remove({
        _id: req.params.id
      }, function(err) {
        if (err) res.json(err)
        res.json({
          message: "Express: deleted client!"
        })
      })
    }
  },

  //==================================================================\\
  //                    END CLIENT CONTROLLER                         \\
  //==================================================================\\

  //==================================================================================================\\
  //==================================================================================================\\

  //==================================================================\\
  //                    BEGIN Todo CONTROLLER                         \\
  //==================================================================\\
  todoController: {

    getAll: function(req, res) {
      db.Todo.find({})
        .populate('client')
        .exec(function(err, todos) {
          if (err) {
            res.json(err)
          } else {
            console.log('Express: getting all todos')
            res.json(todos)
          }
        })
    },

    createNewTodo: function(req, res) {
      var todo = new db.Todo(req.body)
      todo.save(function(err, todo) {
        if (err) res.json(err)
        console.log('Express: adding a new to-do')
        res.json(todo)
      })
    },

      destroy: function(req, res) {
        console.log('req.params: ', req.body, req.params.id)
        db.Todo.remove({_id: req.params.id}, function(err) {
          console.log('error: ', err)
          if (err) res.json(err)
          res.json({message: "Express: deleted client!"})
      })
    }
  }

  //============================================================\\
  //                    END  CONTROLLER                         \\
  //============================================================\\
}
