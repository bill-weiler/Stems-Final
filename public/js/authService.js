(function() {
    'use strict';

    angular.module('authService', [])
      .factory('Auth', Auth)
      .factory('AuthInterceptor', AuthInterceptor)
      .factory('AuthToken', AuthToken)

// ===================\\
// Auth token FACTORY \\
// ===================\\
    function Auth($http, $q, AuthToken) {
      var authFactory = {}

      authFactory.login = function(email, password) {
        return $http.post('/api/v1/stemsApp/signIn', {email: email, password: password})
      }
      authFactory.logout = function(){
        AuthToken.setToken()
      }
      authFactory.isLoggedIn = function(){
        if(AuthToken.getToken()){
          return true
        }else{
          return false
        }
      }
      authFactory.getUser = function(){
        if(AuthToken.getToken()){
          return $http.get('/api/v1/stemsApp/me')
        }else{
          return $q.reject({message: 'User has no token'})
        }
      }
      return authFactory
    }

// ==============\\
// TOKEN FACTORY \\
// ==============\\
    function AuthToken($window) {
      var authTokenFactory = {}

      authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token') //$window: angulars version of the window object and it can be used to get the token from the users browser
      }
      authTokenFactory.setToken = function(token) {
        if (token) {
          $window.localStorage.setItem('token', token)
        } else {
          $window.localStorage.removeItem('token')
        }
      }
      return authTokenFactory
}

// =========================\\
// Auth interceptor FACTORY \\
// =========================\\
      function AuthInterceptor($q, AuthToken, $location) {
        var interceptorFactory = {}

        interceptorFactory.request = function(config){
          var token = AuthToken.getToken()
          if(token){
            config.headers['x-access-token'] = token
          }
          return config
        }

        interceptorFactory.responseError = function(res){
          if(res.status == 403){
            $location.path('/')
          }
          return $q.reject(res)
        }
        return interceptorFactory
      }


    }()) //end of iife
