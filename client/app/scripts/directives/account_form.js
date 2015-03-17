'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:accountForm
 * @description
 * # accountForm
 */
angular.module('openbusApp')
  .directive('accountForm', function () {
    return {
      templateUrl: 'views/accounts/partials/_account.form.html',
      restrict: 'E'
    };
  });
