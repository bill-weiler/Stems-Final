(function() {
  'use strict';

  angular.module('myTodoFactory', [])
    .factory('todoFactory', todoFactory)

  todoFactory.$inject = ['$http']

  function todoFactory ($http) {
    var todoData = {},
      apiUrl = '/api/v1/stemsData/todos'

    todoData.getAll = function() {
      console.log('Getting all clients')
      return $http.get(apiurl)
    }

    todoData.createNewToDo = function(client) {
      console.log('creating new to-do')
      return $http.post(apiUrl, todo)
    }

    todoData.destroy = function(id) {
      console.log('deleting item')
      return $http.delete(apiUrl + '/' + id)
    }
    return todoData

  } //end of todoFactory

}()); //end of iife
