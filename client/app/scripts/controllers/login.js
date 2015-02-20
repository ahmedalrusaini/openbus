'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('LoginCtrl', function ($rootScope, $scope, $http, $location, Auth) {
    $rootScope.pageTitle = "login"
    $scope.alerts = [];
    $scope.user = {};
    $scope.submitted = false;
  
    $scope.login = function(form) {
      $scope.alerts = [];
      $scope.submitted = true;
      if(form.$valid) {
        Auth.login($scope.user)
        .then(function(data){
          $location.path('/');
        })
        .catch(function(err) {
          $scope.alerts.push({type: 'danger', message: err.message});
        });
      }
    };
    
    $scope.setUser = function(role) {
      if(role === "admin") {
        $scope.user.email = "admin@admin.com";
        $scope.user.password = "admin";
      } else if(role === "user") {
        $scope.user.email = "test@test.com";
        $scope.user.password = "test";
      }
    };
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
  });
