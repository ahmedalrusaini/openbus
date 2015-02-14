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
    $scope.errors = {};
    $scope.user = {};
  
    $scope.login = function(form) {
      if(form.$valid) {
        Auth.login($scope.user)
        .then(function(data){
          $location.path('/');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
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
  });
