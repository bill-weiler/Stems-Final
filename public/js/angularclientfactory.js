(function() {
  'use strict';

  angular.module('myClientFactory', [])
    .factory('clientFactory', clientFactory)

  clientFactory.$inject = [$http]

  function clientFactory = ($http) {
    var clientData = {},
      apiUrl = '/api/v1/stemsData/clients'

    clientData.getAll = function() {
      console.log(Getting all clients)
      return $http.get(apiurl)
    }

    clientData.createNewClient = function(restaurant) {
      console.log('creating new client')
      return $http.post(apiUrl, client)
    }

    clientData.getSingleClient = function(id) {
      console.log('getting single client:', id)
      return $http.get(apiUrl + '/' + id)
    }

    clientData.destroy = function(id){
      console.log('deleting client')
      return = $http.delete(apiUrl + '/' + id)
    }

    clientData.update = function(id, client){
      console.log('updating client information')
      return = $http.put(apiUrl + '/' + id, client)
    }
    return clientData
    
  } //end of cllientFactory

}()); //end of iife
