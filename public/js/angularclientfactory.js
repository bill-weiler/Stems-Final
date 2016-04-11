(function() {
  'use strict';

angular.module('myClientFactory', [])
  .factory('clientFactory', clientFactory)

  clientFactory.$inject = [$http]

  function clientFactory = ($http){
    var clientData = {},
      apiUrl = 'http://localhost:8080/api/v1/clients'


  } //end of cllientFactory

}()); //end of iife
