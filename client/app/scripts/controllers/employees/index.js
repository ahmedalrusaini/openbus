'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:EmployeesIndexCtrl
 * @description
 * # EmployeesIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('EmployeesIndexCtrl', function ($scope, $cookieStore, Employee,  Notification) {
    $scope.query = {};
    
    $scope.itemsByPage = $cookieStore.get('empSrcResIBP') || 5;
    $scope.setItemsByPage = function(itemsByPage) {
      $scope.itemsByPage = itemsByPage;
      $cookieStore.put('empSrcResIBP', itemsByPage);
    };
    
    var getEmployees = function() {
      Employee.api.query($scope.query).$promise.then(function(data){
        $scope.employees = data;
        $scope.stSafeEmployees = data;
      });
    };
        
    getEmployees();
        
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
    
    $scope.refresh = function() {
      getEmployees();
    };
    
    $scope.search = function() {
      getEmployees();
    };
    
    $scope.clearForm = function() {
      $scope.query = {};
      getEmployees();
    };
    
  });
