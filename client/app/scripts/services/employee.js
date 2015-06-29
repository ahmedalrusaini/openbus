'use strict';

/**
 * @ngdoc service
 * @name openbusApp.employee
 * @description
 * # employee
 * Service in the openbusApp.
 */
angular.module('openbusApp')
  .service('Employee', function ($resource) {
    return {
      api: $resource('/api/employees/:id', { id: '@_id' }, {
        update: { method: 'PUT' }
      })
    }
  });
