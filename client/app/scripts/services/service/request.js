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
      api: $resource('/api/service/requests/:id', { id: '@_id' }, {
        update: { method: 'PUT' },
        count: { method: 'GET', params: { _count: true } }
      }),
      Statuses: $resource('/api/service/reqstat')
    }
  })
  .service('ServiceRequestConfirmation', function ($resource) {
    return {
      api: $resource('/api/service/requests/:id/confirmations/:confirmationId', { id: '@request.id', confirmationId: '@id' }, {
        update: { method: 'PUT' },
        count: { method: 'GET', params: { _count: true } }
      }),
      Statuses: $resource('/api/service/reqstat')
    }
  });