(function() {
  'use strict';

  //=============Module and dependency injector==============\\
  angular.module('StemsAppp', ['myClientFactory', 'ui.router'])
  .config(MainRouter)

//=============UI Router==============\\
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('signin', {
      url: "/",
      templateUrl: "/html/signin.html"
    })
    .state('home', {
      url: "/clients",
      templateUrl: "/html/clientlist.html"
    })
    .state('todo', {
      url: "/todo",
      templateUrl: "/html/todo.html"
    })
    .state('clientProfile', {
      url: "/clients/:lname",
      templateUrl: "/html/clientprofile.html"
    })
  $urlRouterProvider.otherwise('/')
}

}()); //End of iife
