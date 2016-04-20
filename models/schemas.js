//==================\\
//SCHEMAS!!!!!!!!!!!\\
//==================\\
var mongoose = require('mongoose'),
    bcrypt   = require('bcryptjs')
    Schema   = mongoose.Schema,

//==================\\
//Appointment Schema\\
//==================\\
    appointSchema = new Schema({
      client      : {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
      apptDate    : Date
    }),

//===========\\
//User Schema\\
//===========\\
    userSchema   = new Schema({
      email      : {type: String, required: true},
      password   : {type: String, required: true},
      admin      : Boolean
    }),

    userSchema.pre('save', function(next){
      var user = this //define scope to ensure you're dealing with the current user
      if(!user.isModified('password')) return next()//isModified is a mongoose method
      user.password = bcrypt.hashSync(user.password, 8)
      next()
    })

    userSchema.methods.checkPassword = function(pw){
      var user = this
      return bcrypt.compareSync(pw, user.password) //ensures user enters the correct password
    }

//==================\\
//Green Sheet Schema\\
//==================\\
    greenSheetSchema = new Schema({
    client           : {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
    date             : Date,
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
      propNote    : [String],
      greenSheet : [greenSheetSchema]
    })

//============\\
//To-do Schema\\
//============\\
    todoSchema    = new Schema({
      client      : {type: mongoose.Schema.Types.ObjectId, ref: 'Client'},
      description : {type: String, required: true},
      complete    : { type: Boolean, default: false }
    })

//=========================\\
//Exporting schemas for use\\
//=========================\\

module.exports = {
  Appointment  : mongoose.model('Appointment', appointSchema),
  GreenSheet   : mongoose.model('GreenSheet', greenSheetSchema),
  Client       : mongoose.model('Client', clientSchema),
  User         : mongoose.model('User', userSchema),
  Todo         : mongoose.model('Todo', todoSchema)
}
