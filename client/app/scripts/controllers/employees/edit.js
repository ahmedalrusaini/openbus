'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:EmployeesEditCtrl
 * @description
 * # EmployeesEditCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('EmployeesEditCtrl', function ($scope, $location, $translate, $routeParams, Employee, $modal, Notification) {
    
    $scope.countries = i18n.countries;
    Employee.api.get({id: $routeParams.id}).$promise.then(function(employee) {
      $scope.employee = employee;
      $scope.employeeSafe = angular.copy(employee);

      if($scope.employee.address) {
        $scope.employee.address.countryName = i18n.getCountryName($scope.employee.address.country); 
      } else {
        $scope.employee.address = {};
      } 
    });
    
    $scope.openCountriesModal = function(selectedCountry, employeeForm) {
      var modal = $modal.open({
        templateUrl: 'countriesModal.html',
        controller: 'CountriesModalCtrl',
        resolve: {
          country: selectedCountry
        }
      });
    
      modal.result.then(function(country) {
        $scope.employee.address.country  = country.cca2;
        $scope.employee.address.countryName  = country.name.common;
        employeeForm.$setDirty(true);
      }, function(){
      
      });
    }
    
    $scope.countrySelected = function($item) {
      $scope.employee.address.country = $item.cca2;
    };
    
    $scope.submit = function (form) {
      Notification.init();
          
      if (form.$valid) {
        $scope.employee.$update({},
          function (employee, responseHeaders) {
            $scope.employee = employee;
            $scope.employeeSafe = angular.copy(employee);
            $scope.employee.address.countryName = i18n.getCountryName($scope.employee.address.country);
            
            $translate('messages.employee.success.updated', {
              employee: $scope.employee.lastname + $scope.employee.firstname
            }).then(function (msg) {
              Notification.add('success', msg);
            });
          },
          function (httpResponse) {
            $scope.errors = httpResponse.data.errors;
            var message = httpResponse.data.message;
            Notification.add('danger', message );
          });
      }
    };

    $scope.cancel = function () {
      $location.path("/employees/" + $scope.employee.id);
    };
  
    $scope.delete = function (employee) {
      if (confirm("Delete employee?")) {
        Notification.init();
      
        Employee.api.delete(employee, function () {
          $translate('messages.employee.success.deleted', {
            employee: employee.name
          }).then(function (msg) {
            Notification.add('success', msg);
          });
          
          $location.path("/employees").search({ hasAlerts: true });
        }, function (err) {
          Notification.add('danger', 'messages.employee.danger.deleted');
        });
      }
    };
  
    $scope.isSaveDisabled =   function (employeeForm) {
      return !employeeForm.$dirty || !employeeForm.$valid;
    }

  });
