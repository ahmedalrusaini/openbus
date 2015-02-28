'use strict';

/**
 * @ngdoc service
 * @name openbusApp.service/request
 * @description
 * # service/request
 * Service in the openbusApp.
 */
angular.module('openbusApp')
  .service('ServiceRequest', function ($resource) {
    return {
      api: $resource('/api/service/requests/:id', { id: '@_id' })
    }
  });
