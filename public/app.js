(function() {
  'use strict';

  //=============Module and dependency injector==============\\
  angular.module('StemsApp', ['ui.router','myClientFactory','mainControl'])
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
      url: "/clients/:id",
      templateUrl: "/html/clientprofile.html",
      controller: "clientCtrl as cCtrl"
    })
  $urlRouterProvider.otherwise('/')
}

}()); //End of iife
