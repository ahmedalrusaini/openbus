'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the appApp
 */
angular.module('openbusApp')
  .controller('UserCtrl', function ($scope, $rootScope, $routeParams, $location, User) {
    $rootScope.pageTitle = "user";
    $scope.alerts = [];
    
    $scope.user = User.get({ id: $routeParams.id });
    
    $scope.update = function(form) {
      $scope.user.$update({},
        function(user, responseHeaders){
          console.log("user saved");
          $scope.user = user;
          $scope.alerts.push({type: 'success', message: 'User saved'});
        },
        function(httpResponse){

        });
    };
    
    $scope.cancel = function() {
      $scope.user = User.get({ id: $routeParams.id });
    };
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    
  });
