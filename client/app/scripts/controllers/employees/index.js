'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:EmployeesIndexCtrl
 * @description
 * # EmployeesIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('EmployeesIndexCtrl', function ($scope, Employee, TableCommon, Notification) {
    var getEmployees = function() {
      Employee.api.query().$promise.then(function(data){
        TableCommon.init($scope);
  
        $scope.employees = data;
        $scope.stSafeEmployees = data;
      });
    };
        
    $scope.employees = getEmployees();
    
    $scope.refresh = function() {
      getEmployees();
    };
    
    $scope.delete = function (employee) {
      if (confirm("Delete Employee?")) {
        Notification.init();
        
        var index = $scope.stSafeEmployees.indexOf(employee);
        $scope.stSafeEmployees.splice(index, 1);
        
        Employee.api.delete(employee, function () {
          $translate('messages.employee.success.deleted', {
              account: employee.lastname + " " + employee.firstname
            })
            .then(function (msg) {
              Notification.add('success', msg);
            });
                      
        }, function (err) {
          Notification.add('danger', 'messages.employee.danger.deleted');
        });
      }
    };
    
  });
