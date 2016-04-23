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
      return $http.put(apiUrl + '/' + id, client)
    }

    clientData.destroy = function(id) {
      return $http.delete(apiUrl + '/' + id)
    }

    clientData.destroyPropNote = function(id) {
      return $http.delete(apiUrl + '/' + id)
    }
    return clientData

  } //end of clientFactory

}()); //end of iife
