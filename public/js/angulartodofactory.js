(function() {
  'use strict';

  angular.module('myTodoFactory', [])
    .factory('todoFactory', todoFactory)

  todoFactory.$inject = ['$http']

  function todoFactory ($http) {
    var todoData = {},
      apiUrl = '/api/v1/stemsApp/todos'

    todoData.getAll = function() {
      console.log('Getting all to-dos')
      return $http.get(apiUrl)
    }

    todoData.newToDo = function(todo, client) {
      console.log('creating new to-do', client)
      return $http.post(apiUrl, {description: todo, client: client, complete: false})
    }

    todoData.destroy = function(todo) {
      console.log('Angular Factory: deleting todo')
      return $http.delete(apiUrl + '/' + todo._id)
    }
    return todoData

  } //end of todoFactory

}()); //end of iife
