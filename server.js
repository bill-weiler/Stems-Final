var express     = require('express'),
    app         = express(),
    bodyP       = require('body-parser'),
    logger      = require('morgan'),
    cors        = require('cors'),
    path        = require('path'),
    location    = require('location'),
    mongoose    = require('mongoose'),
    moment      = require('moment'),
    apiRoutes   = require('./api_routes'),
    port        = process.env.PORT || 8080,
    // databaseURL = "mongodb://localhost:27017/stemsApp"
    databaseURL = "mongodb://b_weiler:happykansasranger@ds013898.mlab.com:13898/stemsapp"

    mongoose.connect(databaseURL, function(err){
      if(err) console.log(err)
      console.log('Connected to the MONGODS!')
    })

    app.use(logger('dev'))
    app.use(bodyP.json())
    app.use(bodyP.urlencoded({extended: true}))
    app.use(cors())
    app.use('/api/v1/stemsApp', apiRoutes)
    app.use(express.static(__dirname + '/public'))

    app.listen(port, function(err){
      if(err) console.log(err)
      console.log('Server running on port: ' + port)
    })
