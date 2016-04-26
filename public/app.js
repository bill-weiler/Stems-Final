(function() {
  'use strict';

  //=============Module and dependency injector==============\\
  angular.module('StemsApp', ['ui.router','myClientFactory','mainControl', 'myTodoFactory', 'authService', 'ui.materialize', 'ngMap', 'toastr'])
  .config(MainRouter)
  .constant('toastrConfig', {
      allowHtml: false,
      autoDismiss: false,
      closeButton: false,
      closeHtml: '<button>&times;</button>',
      containerId: 'toast-container',
      extendedTimeOut: 1000,
      iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      },
      maxOpened: 0,
      messageClass: 'toast-message',
      newestOnTop: true,
      onHidden: null,
      onShown: null,
      onTap: null,
      positionClass: 'toast-top-mid',
      preventDuplicates: false,
      preventOpenDuplicates: false,
      progressBar: false,
      tapToDismiss: true,
      target: 'body',
      templates: {
        toast: 'directives/toast/toast.html',
        progressbar: 'directives/progressbar/progressbar.html'
      },
      timeOut: 5000,
      titleClass: 'toast-title',
      toastClass: 'toast'
    })

//=============UI Router==============\\
function MainRouter($stateProvider, $urlRouterProvider, $httpProvider, toastrConfig) {

  // angular.extend( {
  //   autoDismiss: false,
  //   containerId: 'toast-container',
  //   maxOpened: 0,
  //   newestOnTop: true,
  //   positionClass: 'toast-top-center',
  //   preventDuplicates: false,
  //   preventOpenDuplicates: false,
  //   target: 'html'
  // }, 'toastrConfig')


  $httpProvider.interceptors.push('AuthInterceptor')

  $stateProvider
    .state('signin', {
      url: "/",
      templateUrl: "/html/signin.html"
    })
    .state('home', {
      url: "/clients",
      templateUrl: "/html/clientlist.html",
      controller: "clientCtrl as cCtrl"
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
