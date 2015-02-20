'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersShowCtrl
 * @description
 * # UsersShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersShowCtrl', function ($scope, $rootScope, $routeParams, $location, User) {
    $rootScope.pageTitle = "user";
    
    $scope.editMode = false;
    $scope.user = User.get({ id: $routeParams.id });
    
    $scope.submit = function(form) {
      $scope.alerts = [];
      
      if(form.$valid) {
        $scope.user.$update({},
          function(user, responseHeaders){
            $scope.user = user;
            $scope.alerts.push({type: 'success', message: 'User saved'});
          },
          function(httpResponse){
            $scope.alerts.push({type: 'danger', message: httpResponse.data.message || "User update failed"});
          }); 
      }
    };
  
    $scope.toggleEditMode = function() {
      $scope.editMode = !$scope.editMode;
    }
    
    $scope.cancel = function() {
      $scope.toggleEditMode();
      $scope.user = User.get({ id: $routeParams.id });
    };
    
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    
  });
