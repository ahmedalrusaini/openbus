'use strict';

/**
 * @ngdoc service
 * @name openbusApp.units
 * @description
 * # units
 * Service in the openbusApp.
 */
angular.module('openbusApp')
  .service('Units', function ($resource) {
    return {
      api: {
        time: $resource('/api/units/time')
      }
    }
  });
