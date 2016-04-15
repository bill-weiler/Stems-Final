//==Module Name==\\
angular.module('mainCtrl',[])
  .controller('mainController',  mainController)
  .controller('clientCtrl', clientCtrl)

//==Controller as==\\
function mainController($stateParams, $location, clientFactory) {
  var mainCtrl = this


//==============================================\\
//==================VARIABLES===================\\
//==============================================\\

//==Clients==\\
// mainCtrl.Devereaux    = new Client('Blanche',  'Devereaux', '555-555-5555',  'bdevereaux@gmail.com','123 ABC Rd.', 'Denver', 'CO', '80218', '98765')
// mainCtrl.Zbornak      = new Client('Dorothy',  'Zbornak' ,  '444-444-4444',  'dzbornak@gmail.com',  '456 DEF Rd.', 'Denver', 'CO', '80218', '54321')
// mainCtrl.Nylund       = new Client('Rose',     'Nylund' ,   '333-333-3333',  'rnylund@gmail.com',   '789 GHI Rd.', 'Denver', 'CO', '80218', '45678')
// mainCtrl.Petrillo     = new Client('Sophia',   'Petrillo' , '222-222-2222',  'spetrillo@gmail.com', '101 JKL Rd.', 'Denver', 'CO', '80218', '45678')
// mainCtrl.clientsArray = [mainCtrl.Devereaux, mainCtrl.Zbornak, mainCtrl.Nylund, mainCtrl.Petrillo]
// mainCtrl.newClient    = {}

//==To-Dos==\\
mainCtrl.toDoItem1   = new ToDoItem('Blanche', 'Devereaux', 'Spring clean-up and annuals')
mainCtrl.toDoItem2   = new ToDoItem('Dorothy', 'Zbornak',   'Install new design')
mainCtrl.toDoItem3   = new ToDoItem('Rose',    'Nylund',    'Irrigation and watering')
mainCtrl.toDoItem4   = new ToDoItem('Sophia',  'Petrillo',  'Contract arborist')
mainCtrl.toDosArray  = [mainCtrl.toDoItem1, mainCtrl.toDoItem2, mainCtrl.toDoItem3, mainCtrl.toDoItem4]
mainCtrl.newToDoItem = ''

//==Property Notes==\\
mainCtrl.newPropertyNote   = ''
mainCtrl.propertyNoteArray = []


//=================================================\\
//==============Controller Functions===============\\
//=================================================\\
console.log('Params ',$stateParams);
clientFactory.getAll()
  .then(function(res){
    mainCtrl.clients = res.data
  })

  mainCtrl.getSingleClient = function(id){
    clientFactory.getSingleClient(id)
    .then(function(res){
      mainCtrl.client = res.data
      $location.path('/clients/' + res.data._id)
    })
  }

mainCtrl.createNewClient = function(){
  mainCtrl.clientsArray.push(mainCtrl.newClient)
  mainCtrl.newClient = {}
}

mainCtrl.signIn = function(){
  $location.path('/clients')
}


mainCtrl.newToDo = function(){
  var myToDoItem = new ToDoItem(mainCtrl.client.firstName, mainCtrl.client.lastName, mainCtrl.newToDoItem)
  mainCtrl.toDosArray.push(myToDoItem)
  mainCtrl.newToDoItem = ''
}

mainCtrl.removeToDo = function(toDoItem) {
  var x = confirm("Delete this item permanently?");
  if (x == true) {
    mainCtrl.toDosArray.splice(mainCtrl.toDosArray.indexOf(toDoItem), 1)
  }
}

mainCtrl.removeClient = function() {
  var x = confirm("Delete this client permanently?");
  if (x == true) {
    console.log(mainCtrl.clientsArray.indexOf(mainCtrl.client))
    mainCtrl.clientsArray.splice(mainCtrl.clientsArray.indexOf(mainCtrl.client), 1)
  }
}

mainCtrl.addNote = function(){
  mainCtrl.client.notes.push(mainCtrl.newPropertyNote)
  mainCtrl.newPropertyNote = ''
}

//=================================================\\
//============Client Constructor Function==========\\
//=================================================\\
function Client(firstName, lastName, phoneNumber, email, address, city, state, zipCode, doorCode) {
this.firstName   = firstName
this.lastName    = lastName
this.phoneNumber = phoneNumber
this.email       = email
this.address     = address
this.city        = city
this.state       = state
this.zipCode     = zipCode
this.doorCode    = doorCode
this.notes       = []
}

//=================================================\\
//============To-Do Constructor Function===========\\
//=================================================\\
function ToDoItem(firstName, lastName, description){
this.firstName   = firstName
this.lastName    = lastName
this.description = description
}


} //End of controller
function clientCtrl($stateParams, $location, clientFactory){
  var cCtrl = this;
  clientFactory.getSingleClient($stateParams.id)
  .then(function(res){
    cCtrl.client = res.data
  })
}
