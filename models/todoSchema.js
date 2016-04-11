var mongoose      = require('mongoose'),
    Schema        = mongoose.Schema,
    todoSchema    = new Schema({
      firstName   = {type: String, required: true},
      lastName    = {type: String, required: true},
      description = {type: String, required: true}
    })

module.exports = {Todo: mongoose.model('Todo', todoSchema)}
