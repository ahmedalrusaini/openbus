'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersIndexCtrl', function ($rootScope, $scope, User) {
    $rootScope.pageTitle = 'users';
    $scope.users = User.query();
  
    $scope.delete = function(user, index) {
      $scope.alerts = [];
      User.delete(user, function(){
        $scope.alerts.push({type: "success", message:"User " + user.email + " deleted"});
        $scope.users.splice(index);
      }, function(err){
        $scope.alerts.push({type: "danger", message:"User deletion failed"});
      })
    }
  });
