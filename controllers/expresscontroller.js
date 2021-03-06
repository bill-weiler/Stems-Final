var db = require('../models/schemas'),
  jwt = require('jsonwebtoken'),
  moment = require('moment'),
  secret = 'this is my secret'

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

      var tempClient = req.body.client || req.body
      var greenSheet = req.body.greenSheet || ''
      var client = new db.Client(tempClient)
      greenSheet.beginTime        = moment(new Date(greenSheet.beginTime)).format("dddd, MMMM Do YYYY, h:mm:ss a")
      greenSheet.endTime          = moment(new Date(greenSheet.beginTime)).format("dddd, MMMM Do YYYY, h:mm:ss a")
      greenSheet.walkThroughStart = moment(new Date(greenSheet.walkThroughStart)).format("dddd, MMMM Do YYYY, h:mm:ss a")
      greenSheet.walkThroughEnd   = moment(new Date(greenSheet.walkThroughEnd)).format("dddd, MMMM Do YYYY, h:mm:ss a")
      console.log("client :", client)
      client.sendEmail(greenSheet)

      db.Client.findOneAndUpdate({
        _id: req.params.id
      }, client, {
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
        db.Client.find({}, function(er, clients) {
          if (er) {
            res.json(er)
          } else {
            res.json(clients)
          }
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
      db.Todo.remove({
        _id: req.params.id
      }, function(err) {
        console.log('error: ', err)
        if (err) res.json(err)
        res.json({
          message: "Express: deleted client!"
        })
      })
    }
  },

  //==================================================================\\
  //                    END Todo CONTROLLER                           \\
  //==================================================================\\

  //==================================================================================================\\
  //==================================================================================================\\

  //==================================================================\\
  //                    BEGIN User CONTROLLER                         \\
  //==================================================================\\
  userController: {

    //get req

    create: function(req, res) {
      var user = new db.User(req.body)
      user.save(function(err, user) {
        console.log('Express: creating user')
        if (err) res.json(err)
        res.json(user)
      })
    },

    signIn: function(req, res) {
      db.User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) res.json(err)
          //check if a user exists
        if (user) {
          //compare hash password
          if (user.checkPassword(req.body.password)) {
            var token = jwt.sign({
              name: user.name,
              email: user.email
            }, secret, {
              expiresInMinutes: 720
            });
            // 4 - Send back a success message with the JWT
            res.json({
              success: true,
              message: 'Welcome to Stems',
              token: token
            })
          } else {
            res.json({
              success: false,
              message: 'Password does not match'
            })
          }
        } else {
          res.json({
            success: false,
            message: 'User does not exist'
          })
        }
      })
    }

  }

  //============================================================\\
  //                    END  CONTROLLER                         \\
  //============================================================\\
}
