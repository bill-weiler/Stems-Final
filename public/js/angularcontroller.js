//==Module Name==\\
angular.module('mainControl',[])
  .controller('mainController', mainController)
  .controller('clientCtrl', clientCtrl)

//=========================\\
//==START MAIN CONTROLLER==\\
//=========================\\
function mainController($stateParams, $location, clientFactory) {
  var mainCtrl = this


//==============================================\\
//==================VARIABLES===================\\
//==============================================\\

// //==Property Notes==\\
// mainCtrl.newPropertyNote   = ''
// mainCtrl.propertyNoteArray = []


//=================================================\\
//==============Controller Functions===============\\
//=================================================\\
clientFactory.getAll()
  .then(function(res){
    mainCtrl.clients = res.data
  })

mainCtrl.createNewClient = function(client){
  clientFactory.createNewClient(client)
  .then(function(res){
  mainCtrl.clients.push(res.data)
  })
}
mainCtrl.getSingleClient = function(id){
  clientFactory.getSingleClient(id)
  .then(function(res){
    mainCtrl.client = res.data
    $location.path('/clients/' + res.data._id)
  })
}

// mainCtrl.createNewClient = function(){
//   mainCtrl.clientsArray.push(mainCtrl.newClient)
//   mainCtrl.newClient = {}
// }
//
// mainCtrl.signIn = function(){
//   $location.path('/clients')
// }
//
//
// mainCtrl.newToDo = function(){
//   var myToDoItem = new ToDoItem(mainCtrl.client.firstName, mainCtrl.client.lastName, mainCtrl.newToDoItem)
//   mainCtrl.toDosArray.push(myToDoItem)
//   mainCtrl.newToDoItem = ''
// }
//
// mainCtrl.removeToDo = function(toDoItem) {
//   var x = confirm("Delete this item permanently?");
//   if (x == true) {
//     mainCtrl.toDosArray.splice(mainCtrl.toDosArray.indexOf(toDoItem), 1)
//   }
// }
//
// mainCtrl.removeClient = function() {
//   var x = confirm("Delete this client permanently?");
//   if (x == true) {
//     console.log(mainCtrl.clientsArray.indexOf(mainCtrl.client))
//     mainCtrl.clientsArray.splice(mainCtrl.clientsArray.indexOf(mainCtrl.client), 1)
//   }
// }
//
// mainCtrl.addNote = function(){
//   mainCtrl.client.notes.push(mainCtrl.newPropertyNote)
//   mainCtrl.newPropertyNote = ''
// }

} //END OF MAIN CONTROLLER


//=======================\\
//START CLIENT CONTROLLER\\
//=======================\\
function clientCtrl($stateParams, $location, clientFactory){
  var cCtrl = this

//=================================================\\
//==============Controller Functions===============\\
//=================================================\\

  clientFactory.getSingleClient($stateParams.id)
  .then(function(res){
    cCtrl.client = res.data
  })

} //END OF CLIENT CONTROLLER
