'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:followupModal
 * @description
 * # followupModal
 */
angular.module('openbusApp')
  .controller('FollowupModalCtrl', function($scope, $followups, $modalInstance) {
    $scope.followups = $followups;

    $scope.createFollowup = function(id) {
      var fup = $.grep($scope.followups, function(fup){
        return fup.id === id;
      })[0];

      $modalInstance.close(fup);
    };
  
    $scope.close = function() {
      $modalInstance.dismiss('cancel');
    };
  })
  .directive('followupModal', function () {
    return {
      templateUrl: 'views/directives/followup_modal.html',
      restrict: 'E'
    };
  });
