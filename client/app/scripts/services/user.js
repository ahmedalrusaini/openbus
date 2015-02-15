'use strict';

/**
 * @ngdoc service
 * @name openbusApp.user.service
 * @description
 * # user.service
 * Service in the openbusApp.
 */
angular.module('openbusApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id', { id: '@_id' }, {
      me: { method: 'GET', params: { id: 'me' } },
      update: { method: 'PUT' }
    })
  });
