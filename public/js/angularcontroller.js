//======\\
//Module\\
//======\\
angular.module('mainControl', [])
  .controller('mainController', mainController)
  .controller('clientCtrl', clientCtrl)
  .controller('loginCtrl', loginCtrl)

//============================================================================\\
//                                                                            \\
//                       ~START MAIN CONTROLLER~                              \\
//                                                                            \\
//============================================================================\\
function mainController($stateParams, $location, clientFactory) {
  var mainCtrl = this

  //=============================\\
  //mainCtrl Controller Functions\\
  //=============================\\
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

  cCtrl.newPropNote = ''
  cCtrl.newGreenSheet = {}

  //==========================\\
  //cCtrl Controller Functions\\
  //==========================\\

  clientFactory.getSingleClient($stateParams.id)
    .then(function(res) {
      cCtrl.client = res.data
    })

    cCtrl.logTime = function(){
      console.log(cCtrl.client.dateBegin)
    }

    cCtrl.init = function() {
      clientFactory.getAll()
        .then(function(res) {
          cCtrl.clients = res.data
        })
        todoFactory.getAll()
          .then(function(res) {
            cCtrl.todos = res.data
          })
    }

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
    if (cCtrl.newPropNote) {
      client.propNote.push(cCtrl.newPropNote)
    }
    clientFactory.update(client._id, client)
      .then(function(res) {
        console.log(res)
      })
    cCtrl.newPropNote = ''
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

  cCtrl.addTodo = function(todo, client) {
    todoFactory.newToDo(todo, client)
      .then(function(res) {
        cCtrl.init()
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

  cCtrl.addGreenSheet = function(newGreenSheet, client) {
    client.greenSheet    = client.greenSheet || []

    if (cCtrl.newGreenSheet) {
      var beginTime        = moment(cCtrl.newGreenSheet.beginTime)
      var endTime          = moment(cCtrl.newGreenSheet.endTime)
      var walkThroughStart = moment(cCtrl.newGreenSheet.walkThroughStart)
      var walkThroughEnd   = moment(cCtrl.newGreenSheet.walkThroughEnd)

      cCtrl.newGreenSheet.beginTime        = moment(cCtrl.newGreenSheet.date).hour(beginTime.hour()).minute(beginTime.minutes()).toDate()
      cCtrl.newGreenSheet.endTime          = moment(cCtrl.newGreenSheet.date).hour(endTime.hour()).minute(endTime.minutes()).toDate()
      cCtrl.newGreenSheet.walkThroughStart = moment(cCtrl.newGreenSheet.date).hour(walkThroughStart.hour()).minute(walkThroughStart.minutes()).toDate()
      cCtrl.newGreenSheet.walkThroughEnd   = moment(cCtrl.newGreenSheet.date).hour(walkThroughEnd.hour()).minute(walkThroughEnd.minutes()).toDate()

      client.greenSheet.push(cCtrl.newGreenSheet)
      console.log(newGreenSheet);
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

//============================================================================\\
//                                                                            \\
//                       ~START Login CONTROLLER~                             \\
//                                                                            \\
//============================================================================\\

function loginCtrl(Auth, $location, $rootScope, AuthToken) {
  var lCtrl = this

  //==========================\\
  //lCtrl Controller Functions\\
  //==========================\\

  lCtrl.loggedIn = Auth.isLoggedIn()

  $rootScope.$on('$stateChangeSuccess', function() {
    lCtrl.loggedIn = Auth.isLoggedIn()
    if(lCtrl.loggedIn){
      Auth.getUser()
      .then(function(res) {
        lCtrl.user = res.data
      })
    }else{
      $location.path('/signin')
    }
  })

  lCtrl.doLogin = function() {
    Auth.login(lCtrl.loginData.email, lCtrl.loginData.password)
      .then(function(res) {
        // console.log(res.data);
          AuthToken.setToken(res.data.token)
          $location.path('/clients')
          lCtrl.loginData.email = ''
          lCtrl.loginData.password = ''
      })
  }

  lCtrl.doLogout = function(){
    Auth.logout()
    lCtrl.user = ''
    $location.path('/signIn')
  }
}
  //
