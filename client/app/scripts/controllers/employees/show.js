'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:EmployeesShowCtrl
 * @description
 * # EmployeesShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('EmployeesShowCtrl', function ($scope, $routeParams, Employee, uiGmapGoogleMapApi) {
    Employee.api.get({id: $routeParams.id}).$promise.then(function(employee) {
      $scope.employee = employee;
      $scope.employeeSafe = angular.copy(employee);
    
      if($scope.employee.address) {
        $scope.employee.address.countryName = i18n.getCountryName($scope.employee.address.country);
      
        var url = 'http://maps.google.com/maps/api/geocode/json?address=' + $scope.employee.address.text;

        $.get(url, function(data) {
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
        });
      } else {
        $scope.employee.address = {};
      }
    });
  });
