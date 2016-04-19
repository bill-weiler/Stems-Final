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

  // mainCtrl.removeToDo = function(toDoItem) {
  //   var x = confirm("Delete this item permanently?");
  //   if (x == true) {
  //     mainCtrl.toDosArray.splice(mainCtrl.toDosArray.indexOf(toDoItem), 1)
  //   }
  // }
  //

}
//==================================================================\\
//                  END OF MAIN CONTROLLER                          \\
//==================================================================\\

//============================================================================\\
//                                                                            \\
//                        ~START CLIENT CONTROLLER~                           \\
//                                                                            \\
//============================================================================\\
function clientCtrl($state, $stateParams, $location, clientFactory, todoFactory) {
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
    client.propNote = client.propNote || []
    if (client.newPropNote) {
      client.propNote.push(client.newPropNote)
    }
    clientFactory.update(client._id, client)
      .then(function(res) {
        console.log(res)
      })
    cCtrl.client.newPropNote = ''
  }

  cCtrl.removePropNote = function(note, client) {
    var x = confirm("Delete this client permanently?")
    if (x == true) {
      client.propNote.splice(client.propNote.indexOf(note), 1)
      clientFactory.update(client._id, client)
        .then(function(res) {
          console.log(res)
        })
    }
  }

  todoFactory.getAll()
    .then(function(res) {
      cCtrl.todos = res.data
    })

  cCtrl.addTodo = function(todo, client) {
    todoFactory.newToDo(todo, client)
      .then(function(res) {
        console.log(res);
      })
      cCtrl.todo = ''
  }

  cCtrl.removeToDo = function(todo) {
    var x = confirm("Delete this item permanently?")
    if (x == true) {
      todoFactory.destroy(todo)
        .then(function(res) {
          console.log(res)
          todoFactory.getAll()
            .then(function(res) {
              cCtrl.todos = res.data
            })
        })
    }
  }

  cCtrl.addGreenSheet = function(greenSheet) {
    client.greenSheet = client.greenSheet || []
    if (client.greenSheet) {
      client.greenSheet.push(client.greenSheet)
    }
    clientFactory.update(client._id, client)
      .then(function(res) {
        console.log(res)
      })
    cCtrl.client.greenSheet = ''
  }


}
//==================================================================\\
//                    END OF CLIENT CONTROLLER                      \\
//==================================================================\\
