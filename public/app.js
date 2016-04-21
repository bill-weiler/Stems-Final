(function() {
  'use strict';

  //=============Module and dependency injector==============\\
  angular.module('StemsApp', ['ui.router','myClientFactory','mainControl', 'myTodoFactory', 'authService'])
  .config(MainRouter)

//=============UI Router==============\\
function MainRouter($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('AuthInterceptor')

  $stateProvider
    .state('signin', {
      url: "/",
      templateUrl: "/html/signin.html"
    })
    .state('home', {
      url: "/clients",
      templateUrl: "/html/clientlist.html",
      controller: "mainController as mainCtrl"
    })
    .state('todo', {
      url: "/todo",
      templateUrl: "/html/todo.html",
      controller: "clientCtrl as cCtrl"

    })
    .state('clientProfile', {
      url: "/clients/:id",
      templateUrl: "/html/clientprofile.html",
      controller: "clientCtrl as cCtrl"
    })
  $urlRouterProvider.otherwise('/')
}

}()); //End of iife
