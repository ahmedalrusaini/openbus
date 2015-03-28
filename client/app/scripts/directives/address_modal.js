'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:addressModal
 * @description
 * # addressModal
 */
angular.module('openbusApp')
  .directive('addressModal', function () {
    return {
      templateUrl: 'views/directives/address_modal.html',
      restrict: 'E'
    };
  })
  .controller("AddressModalCtrl", function($scope, $modalInstance, address, editMode){
    $scope.addressModal = address;
    $scope.editMode = editMode;
    
    $scope.cancelModal = function() {
      $modalInstance.dismiss('cancel');
    };
    
    $scope.saveModal = function(form) {
      if(form.$valid) {
        $modalInstance.close($scope.addressModal);
        $scope.addressModal = {};
      }
    }
  });