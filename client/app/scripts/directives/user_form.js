'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:userForm
 * @description
 * # userForm
 */
angular.module('openbusApp')
  .directive('userForm', function () {
    return {
      templateUrl: 'views/users/partials/_form.html',
      restrict: 'E'
    };
  });