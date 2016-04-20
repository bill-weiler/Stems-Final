(function() {
    'use strict';

    angular.module('authService', [])
      .factory('Auth', function($http, $q, AuthToken) {})
      .factory('AuthInterceptor', function($q, AuthToken) {})
      .factory('AuthToken', function($window) {})

// ===================\\
// Auth token FACTORY \\
// ===================\\
    function Auth($http, $q, AuthToken) {
      var authFactory = {}

      authFactory.login = function(email, password) {
        return $http.post('/api/v1/stemsApp/signIn', {email: email, password: password})
          .then(function(data){
            AuthToken.setToken(data.token)
            return data
          })
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
      function AuthInterceptor($q, AuthToken) {
        var interceptorFactory = {}

        interceptorFactory.request = function(config){
          var token = AuthToken.getToken()
          if(token){
            config.headers['x-access-token'] = token
          }
          return conig
        }
        
        interceptorFactory.responseError = function(response){
          if(response.status == 403){
            $location.path('/')
          }
          return $q.reject(response)
        }
        return interceptorFactory
      }



    }()) //end of iife
