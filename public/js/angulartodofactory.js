(function() {
  'use strict';

angular.module('myTodoFactory', [])
  .factory('todoFactory', todoFactory)

  todoFactory.$inject = [$http]

  function todoFactory = ($http){
    var todoData = {},
      apiUrl = '/api/v1/stemsData/todos'

      todoData.getAll = function() {
        console.log(Getting all clients)
        return $http.get(apiurl)
      }

      todoData.createNewClient = function(restaurant) {
        console.log('creating new client')
        return $http.post(apiUrl, client)
      }

      todoData.destroy = function(id){
        console.log('deleting client')
        return = $http.delete(apiUrl + '/' + id)
      }
      return todoData

  } //end of todoFactory

}()); //end of iife
