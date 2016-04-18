(function() {
  'use strict';

  angular.module('myClientFactory', [])
    .factory('clientFactory', clientFactory)

  clientFactory.$inject = ['$http']

  function clientFactory ($http) {
    var clientData = {},
      apiUrl = '/api/v1/stemsApp/clients'

    clientData.getAll = function() {
      return $http.get(apiUrl)
    }

    clientData.createNewClient = function(client) {
      return $http.post(apiUrl, client)
      console.log(client);
    }

    clientData.getSingleClient = function(id) {
      return $http.get(apiUrl + '/' + id)
    }

    clientData.update = function(id, client) {
      console.log('Angular Factory: updating client information')
      return $http.put(apiUrl + '/' + id, client)
    }

    clientData.destroy = function(id) {
      console.log('Angular Factory: deleting client')
      return $http.delete(apiUrl + '/' + id)
    }
    return clientData

  } //end of cllientFactory

}()); //end of iife
