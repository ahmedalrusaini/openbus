'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:stFilterable
 * @description
 * # stFilterable
 */
angular.module('openbusApp')
  .controller('StFilterableCtrl', function($scope) {
    $scope.toggleFilters = function() {
      $scope.filtersOn = !$scope.filtersOn;
    };    
  })
  .directive('stFilterable', function () {
    return {
      require: "^stTable",
      restrict: 'A',
      controller: 'StFilterableCtrl'
    };
  });
