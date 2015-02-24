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
    return {
      api: $resource('/api/users/:id/:controller', { id: '@_id' }, {
        me: { method: 'GET', params: { id: 'me' } },
        update: { method: 'PUT' },
        changePassword: { method: 'PUT', params: { controller:'password' } }
      }),
      roles: [
        { id: 'user', name: 'user.roles.user' }, 
        { id: 'admin', name: 'user.roles.admin' }
      ]
    }
  });
