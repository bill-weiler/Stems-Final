var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    clientSchema  = new Schema({
      firstName   : {type: String, required: true},
      lastName    : {type: String, required: true},
      phoneNumber : {type: String, required: true},
      email       : String,
      address     : String,
      city        : String,
      state       : String,
      zipCode     : Number,
      doorCode    : Number,
    })

module.exports = {Client: mongoose.model('Client', clientSchema)}
