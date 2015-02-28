'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersIndexCtrl
 * @description
 * # UsersIndexCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
  .controller('UsersIndexCtrl', function ($rootScope, $scope, User, $translate, $filter) {
    $rootScope.pageTitle = 'users';
    
    $scope.roles = User.roles;
    
    User.api.query().$promise.then(function(data){
      $scope.users = data;
      $scope.stSafeUsers = data;
    });
  
    $scope.delete = function (user, index) {
      if (confirm("Delete user?")) {
        $rootScope.initAlerts()
        User.api.delete(user, function () {
          $scope.users.splice(index, 1);
          
          $translate('messages.user.success.deleted', {
              user: user.fullname || user.email
            })
            .then(function (msg) {
              $rootScope.addAlert('success', msg);
            });
          
        }, function (err) {
          $rootScope.addAlert('danger', 'messages.user.danger.deleted');
        });
      }
    };
      
    $scope.showInlineFilters = false;
  
    $scope.toggleInlineFilters = function() {
      $scope.showInlineFilters = !$scope.showInlineFilters;
    };
  
    $("[data-toggle='tooltip']").tooltip();
    
    $scope.times = function(num) {
      return new Array(num);
    }
  
  });
