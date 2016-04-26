//==================\\
//SCHEMAS!!!!!!!!!!!\\
//==================\\
var mongoose    = require('mongoose'),
    bcrypt      = require('bcryptjs')
    Schema      = mongoose.Schema,
    mailgun     = require('mailgun-js')({apiKey: 'key-95b2c12d9214f3601dbfe36d1205511b', domain: 'sandbox752ae19ce072424bbba43a7ddda3a9b8.mailgun.org'})

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
      email      : {type: String, required: true, unique: true},
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
    date             : {type: Date, default: Date.now},
    beginTime        : Date,
    endTime          : Date,
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

//MAILGUN-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

    clientSchema.methods.sendEmail = function(gs){
      var client = this
      var data = {
          from: 'Stems App <me@samples.mailgun.org>',
          to: 'bill.steven.weiler@gmail.com',
          subject: 'New Greensheet',
          text: 'Client Name: ' + client.firstName + ' ' + client.lastName + '\n'
          + 'Date: ' + gs.beginTime + '\n'
          + 'Begin Time: ' + gs.beginTime + '\n'
          + 'End Time: '   + gs.endTime + '\n'
          + 'Team: ' + gs.team + '\n'
          + 'Walk-Through Start:  ' + gs.walkThroughStart + '\n'
          + 'Walk-Through End: ' + gs.walkThroughEnd + '\n'
          + 'Trash: ' + gs.trash + '\n'
          + 'Front Bed Notes: ' + gs.frontNotes + '\n'
          + 'Front Bed Actions: ' + gs.frontOptions + '\n'
          + 'Back Bed Notes: ' + gs.backNotes + '\n'
          + 'Back Bed Actions: ' + gs.backOptions + '\n'
          + 'Side Bed Notes: ' + gs.sideNotes + '\n'
          + 'Side Bed Actions: ' + gs.sideNotes + '\n'
          + 'Annual Notes: ' + gs.annualNotes + '\n'
          + 'Annual Actions: ' + gs.annualOptions + '\n'
          + 'Tree/Shrub Notes: ' + gs.treeNotes + '\n'
          + 'Tree/Shrub Actions: ' + gs.treeOptions + '\n'
          + 'Trip Focus: ' + gs.tripFocus + '\n'
          + 'Client Questions: ' + gs.questions + '\n'
          + 'Special Notes: ' + gs.specialNote + '\n'
          + 'Materials Used: ' + gs.materials + '\n'
          + 'Irrigation/Sprinkler: ' + gs.irrigation + '\n'
          + "IDEAS! 'Oh, this would look so much better:' " + gs.ideas + '\n'
          + 'Picture Worthy?: ' + gs.pictureWorthy
        };

        mailgun.messages().send(data, function (err, body) {
          console.log(body);
          if(err){
            console.log(err);
          }
        });
      }
//MAILGUN-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


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
