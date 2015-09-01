'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:employeeModal
 * @description
 * # employeeModal
 */
angular.module('openbusApp')
    .directive('employeeSearchModal', function () {
      return {
        templateUrl: '/views/directives/employee_search_modal.html',
        restrict: 'E'
      };
    })
    .controller("EmployeeSearchModalCtrl", function($scope, $modalInstance, Employee){       
      Employee.api.query().$promise.then(function(data){
        $scope.employees = data;
        $scope.stSafeEmployees = data;
      });
    
      $scope.cancelModal = function() {
        $modalInstance.dismiss('cancel');
      };
    
      $scope.select = function(employee) {
        $modalInstance.close(employee);
      };
      
    });
