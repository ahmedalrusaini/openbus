'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersNewCtrl
 * @description
 * # UsersNewCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersNewCtrl', function ($scope, $location, User) {
    $scope.user = {}
    $scope.submitted = false;
    $scope.editMode = true;
  
    $scope.submit = function(form) {      
      $scope.alerts = [];
      $scope.submitted = true;
      
      console.log($scope.user.password_confirmation);
      console.log($scope.user.password);
      if($scope.user.password !== $scope.user.password_confirmation) {
        form.password_confirmation.$setValidity("match", false);
      }
    
      if(form.$valid) {        
        User.save($scope.user, 
          function(user, responseHeaders){
            $location.path("/users/"+user.id);
          },
          function(httpResponse){
            var message = httpResponse.data.message || "User creation failed";
            $scope.alerts.push({type: 'danger', message: message });
          }); 
      }
    };
  
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };    

  });