'use strict';

/**
 * @ngdoc function
 * @name openbusApp.controller:UsersShowCtrl
 * @description
 * # UsersShowCtrl
 * Controller of the openbusApp
 */
angular.module('openbusApp')
.controller('UsersShowCtrl', function ($scope, $rootScope, $routeParams, $location, $translate, User) {
  $scope.user = User.api.get({ id: $routeParams.id });
  
  User.Roles.query().$promise.then(function(data){
    $scope.roles = data;
  });
  
  $scope.submit = function (form) {
    $rootScope.initAlerts();
    
    if (form.$valid) {
      $scope.user.$update({},
        function (user, responseHeaders) {
          $scope.user = user;
          $translate('messages.user.success.updated', {
              user: $scope.user.fullname || $scope.user.email
            }).then(function (msg) {
              $rootScope.addAlert('success', msg);
            });
        },
        function (httpResponse) {
          $scope.errors = httpResponse.data.errors;
          var message = httpResponse.data.message || 'User update failed';
          $rootScope.addAlert('danger', message );
        });
    }
  }

  $scope.cancel = function () {
    $location.path("/users/" + $routeParams.id);
  };
  
  $scope.delete = function (user) {
    if (confirm("Delete user?")) {
      $rootScope.initAlerts();
      
      User.api.delete(user, function () {
        $translate('messages.user.success.deleted', {
          user: user.fullname || user.email
        }).then(function (msg) {
          $rootScope.addAlert('success', msg);
        });
        
        $location.path("/users").search({ hasAlerts: true });
      }, function (err) {
        $rootScope.addAlert('danger', 'messages.user.danger.deleted');
      });
    }
  };
  
  $scope.isSaveDisabled = function (form) {
    return !form.$valid;
  }
});
