'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:dismissable
 * @description
 * # dismissable
 */
angular.module('openbusApp')
  .directive('dismissable', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        console.log(element);
        scope.dismiss = function () {
          element.modal('hide');
        };
      }
    };
  });