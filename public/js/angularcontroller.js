//======\\
//Module\\
//======\\
angular.module('mainControl', [])
  .controller('mainController', mainController)
  .controller('clientCtrl', clientCtrl)

//============================================================================\\
//                                                                            \\
//                       ~START MAIN CONTROLLER~                              \\
//                                                                            \\
//============================================================================\\
function mainController($stateParams, $location, clientFactory) {
  var mainCtrl = this

  //====================\\
  //Controller Functions\\
  //====================\\
  mainCtrl.init = function() {
    clientFactory.getAll()
      .then(function(res) {
        mainCtrl.clients = res.data
      })
  }

  mainCtrl.createNewClient = function(client) {
    clientFactory.createNewClient(client)
      .then(function(res) {
        mainCtrl.clients.push(res.data)
      })
  }
  mainCtrl.getSingleClient = function(id) {
    clientFactory.getSingleClient(id)
      .then(function(res) {
        mainCtrl.client = res.data
        $location.path('/clients/' + res.data._id)
      })
  }

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

}
//==================================================================\\
//                  END OF MAIN CONTROLLER                          \\
//==================================================================\\

//============================================================================\\
//                                                                            \\
//                        ~START CLIENT CONTROLLER~                           \\
//                                                                            \\
//============================================================================\\
function clientCtrl($state, $stateParams, $location, clientFactory) {
  var cCtrl = this
  var newPropNote = ''

  //====================\\
  //Controller Functions\\
  //====================\\

  clientFactory.getSingleClient($stateParams.id)
    .then(function(res) {
      cCtrl.client = res.data
    })

  cCtrl.removeClient = function(id) {
    var x = confirm("Delete this client permanently?")
    if (x == true) {
      clientFactory.destroy($stateParams.id)
        .then(function(res) {
          $state.go('home')
          console.log(res)
        })
    }
  }

  cCtrl.editClient = function(client) {
    clientFactory.update(client._id, client)
      .then(function(res) {
        console.log(res)
      })
  }

  cCtrl.addPropNote = function(client) {
    clientFactory.update(client._id, client) //push newPropNote into the empty array
    .then(function(res){
      console.log(res)
    })
  }
}
//==================================================================\\
//                    END OF CLIENT CONTROLLER                      \\
//==================================================================\\
