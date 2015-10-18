'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:CommonUiDatepickerctrlCtrl
 * @description
 * # CommonUiDatepickerctrlCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('CommonDatepickerCtrl', function ($scope) {
    $scope.status = {
      opened: false
    };
    
    $scope.format = "dd/MM/yyyy";
    
    $scope.openDatepicker = function($event) {
      if($event) {
        $event.preventDefault();
        $event.stopPropagation();
      }
      
      $scope.status.opened = true;
    };
    
  });
