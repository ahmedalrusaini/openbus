'use strict';

/**
 * @ngdoc directive
 * @name appApp.directive:bootstrap
 * @description
 * # bootstrap
 */
angular.module('openbusApp')
  .directive('formGroup', function () {
    return {
      templateUrl: 'views/bootstrap/form_group.html',
      restrict: 'E',
      scope: {
        ngModel: '=',
        id: '@',
        label: '@',
        labelCol: '@',
        fieldCol: '@',
        disabled: '@',
        invalid: '@',
        dirty: '@', 
        errors: '='
      }
    };
  })
  .directive('formGroupButtons', function () {
    return {
      templateUrl: 'views/bootstrap/form_group_buttons.html',
      restrict: 'E',
      scope: {
        defBtnId: '@',
        defBtnTitle: '@',
        altBtnId: '@',
        altBtnTitle: '@',
        spacerCol: '@',
        buttonCol: '@',
      }
    };
  });
