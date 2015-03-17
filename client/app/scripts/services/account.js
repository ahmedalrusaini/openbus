'use strict';

/**
 * @ngdoc service
 * @name openbusApp.Account
 * @description
 * # Account
 * Service in the openbusApp.
 */
angular.module('openbusApp')
  .service('Account', function ($resource) {
    return {
      api: $resource('/api/accounts/:id', { id: '@_id' }, {
        update: { method: 'PUT' }
      }),
      Types: $resource('/api/account/types')
    }
  });
