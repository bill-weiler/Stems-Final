(function() {
  'use strict';

angular.module('myTodoFactory', [])
  .factory('todoFactory', todoFactory)

  todoFactory.$inject = [$http]

  function todoFactory = ($http){
    var todoData = {},
      apiUrl = 'http://localhost:8080/api/v1/clients'


  } //end of todoFactory

}()); //end of iife
