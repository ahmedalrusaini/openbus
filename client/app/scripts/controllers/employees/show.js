'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:EmployeesShowCtrl
 * @description
 * # EmployeesShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('EmployeesShowCtrl', function ($scope, $routeParams, Employee, Account, uiGmapGoogleMapApi, TableCommon) {
    TableCommon.init($scope);
    
    Employee.api.get({id: $routeParams.id}).$promise.then(function(employee) {
      $scope.employee = employee;
      $scope.employeeSafe = angular.copy(employee);
    
      if($scope.employee.address) {
        $scope.employee.address.countryName = i18n.getCountryName($scope.employee.address.country);
      
        var url = 'http://maps.google.com/maps/api/geocode/json?address=' + $scope.employee.address.text;

        $.get(url, function(data) {
          if (data.results && data.results[0]) {
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
      
            uiGmapGoogleMapApi.then(function(maps) {
              $scope.map = { 
                center: { latitude: lat, longitude: lng }, 
                zoom: 15,
                marker: {
                  idkey: 1,
                  coords: { latitude: lat, longitude: lng }
                }
              };
            });
          }  
        });
      } else {
        $scope.employee.address = {};
      }
      
      Account.api.query({'employeeRels.empid': $scope.employee.id}).$promise.then(function(accounts){
        $scope.accountRels = [];
                
        _.each(accounts, function(account){
          var rels = _.filter(account.employeeRels, {empid: $scope.employee.id});
          
          _.each(rels, function(rel){
            $scope.accountRels.push({type: rel.type, account: account, accountName: account.name});
          });
        });
        
        $scope.stAccountRelsSafe = $scope.accountRels;
      });
    });
    
  });
