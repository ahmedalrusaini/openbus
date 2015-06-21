'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:pageHeader
 * @description
 * # pageHeader
 */
angular.module('openbusApp')
  .directive('pageHeader', function () {
    return {
      templateUrl: '/views/directives/page_header.html',
      restrict: 'E',
      replace: true, 
      transclude: true,
      scope: {
        heading: "@",
        backUrl: "@",
        backTitle: "@"
      }
    };
  });
