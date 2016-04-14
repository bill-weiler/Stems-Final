//==================\\
//SCHEMAS!!!!!!!!!!!\\
//==================\\
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,

//==================\\
//Appointment Schema\\
//==================\\
    appointSchema = new Schema({
      client      : {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
      apptDate    : Date
    }),

//==================\\
//Green Sheet Schema\\
//==================\\
    greenSheetSchema = new Schema({
    client           : {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    dateBegin        : Date,
    dateEnd          : Date,
    team             : [String],
    walkThroughStart : Date,
    walkThroughEnd   : Date,
    trash            : String,
    frontNotes       : String,
    frontOptions     : [String],
    backNotes        : String,
    backOptions      : [String],
    sideNotes        : String,
    sideOptions      : [String],
    annualsNotes     : String,
    annualsOptions   : [String],
    treeNotes        : String,
    treeOptions      : [String],
    tripFocus        : String,
    questions        : String,
    specialNote      : String,
    materials        : String,
    irrigation       : String,
    ideas            : String,
    pictureWorthy    : Boolean
    }),

//=============\\
//Client Schema\\
//=============\\
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
      propNotes   : [String],
      greenSheets : [greenSheetSchema]
    })

//============\\
//To-do Schema\\
//============\\
    todoSchema    = new Schema({
      client      : {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
      description : {type: String, required: true},
      complete    : Boolean
    })

//=========================\\
//Exporting schemas for use\\
//=========================\\
module.exports = {
  Appointment  : mongoose.model('Appointment', appointSchema),
  GreenSheet   : mongoose.model('GreenSheet', greenSheetSchema),
  Client       : mongoose.model('Client', clientSchema),
  Todo         : mongoose.model('Todo', todoSchema)
}
