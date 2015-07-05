'use strict';

/**
 * @ngdoc directive
 * @name openbusApp.directive:relationshipModal
 * @description
 * # relationshipModal
 */
angular.module('openbusApp')
  .directive('employeeRelModal', function () {
    return {
      templateUrl: 'views/directives/employee_rel_modal.html',
      restrict: 'E'
    };
  })
  .controller("EmployeeRelModalCtrl", function($scope, relationship, editMode, $modal, $modalInstance, Employee) {
    $scope.editMode = editMode;
    $scope.relationship = relationship;
    // $scope.employeeRelTypes = [{id:"responsible", name:"Responsible"}, {id:"salesrep", name:"Sales Rep."}];
      
    Employee.RelationshipTypes.query().$promise.then(function(types) {
      $scope.employeeRelTypes = types;
    });
      
    $scope.cancelModal = function() {
      $modalInstance.dismiss('cancel');
    };
    
    $scope.saveModal = function(form) {
      if(form.$valid) {
        $modalInstance.close(relationship);
      }
    };
    
    $scope.isSaveDisabled = function (form) {
      return !form.$valid || !form.$dirty;
    };
   
    $scope.openEmployeeSearchModal = function() {
      var modal = $modal.open({
        templateUrl: 'employeeSearchModal.html',
        controller: 'EmployeeSearchModalCtrl'
      });
    
      modal.result.then(function(employee) {
        $scope.relationship.empid = employee.id;
        $scope.relationship.employee = angular.copy(employee);
      }, function(){
      
      });
    }
   
  });