'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:employeeForm
 * @description
 * # employeeForm
 */
angular.module('openbusApp')
  .directive('employeeForm', function () {
    return {
      templateUrl: 'views/employees/partials/_employee.form.html',
      restrict: 'E'
    };
  });
