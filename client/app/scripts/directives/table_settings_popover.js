'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:tableSettingsPopover
 * @description
 * # tableSettingsPopover
 */
angular.module('openbusApp')
  .controller('TableSettingsPopoverCtrl', function($scope) {
    $scope.submit = function() {
      $scope.onSubmit()($scope.itemsByPage);
    };
  })
  .directive('tableSettingsPopover', function($cookieStore) {
    return {
      templateUrl: '/views/directives/table_settings_popover.html',
      restrict: 'A',
      scope: {
        itemsByPage: '=',
        onSubmit: '&'
      }
    };
  });
