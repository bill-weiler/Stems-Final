var db = require('../models/schemas')

module.exports = {
  clientController: {

    getAll: function(req, res) {
      db.Client.find({}, function(err, clients) {
        if (err) {
          res.json(err)
        } else {
          console.log('Getting all clients')
          res.json(clients)
        }
      })
    },

    getSingleClient: function (req, res) {
      db.Client.findOne({_id: req.params.id}, function (err, client) {
        if (err) {
          res.json(err)
        } else {
          console.log('Getting a single client')
          res.json(client)
        }
      })
    },

    createNewClient: function (req, res) {
      var client = new db.Client(req.body)
      client.save(function (err, client) {
        if (err) res.json(err)
        console.log('Adding a new client')
        res.json(client)
      })
    },

    update: function (req, res) {
      db.Client.findOne({_id: req.params.id}, function (err, client) {
        if (req.body.firstName)   {client.firstName = req.body.firstName}
        if (req.body.lastName)    {client.lastName = req.body.lastName}
        if (req.body.phoneNumber) {client.phoneNumber = req.body.phoneNumber}
        if (req.body.email)       {client.email = req.body.email}
        if (req.body.address)     {client.address = req.body.address}
        if (req.body.city)        {client.city = req.body.city}
        if (req.body.state)       {client.state = req.body.state}
        if (req.body.zipCode)     {client.zipCode = req.body.zipCode}
        if (req.body.doorCode)    {client.doorCode = req.body.doorCode}
        client.save(function (err, c) {
          console.log('Updating client');
          res.json(c)
        })
      })
    },

    destroy: function (req, res) {
      db.Client.remove({_id: req.params.id}, function(err){
        if (err) res.json(err)
        res.json({message: "Deleted client!"})
      })
    }
  }
}
