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
    $rootScope.pageTitle = "user";
    $scope.editMode = $routeParams.action === 'edit';  
    $scope.user = User.api.get({ id: $routeParams.id });
    $scope.roles = User.roles;
    
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

    $scope.toggleEditMode = function () {
      $scope.editMode = !$scope.editMode;
    }

    $scope.cancel = function () {
      $scope.toggleEditMode();
      $scope.user = User.api.get({ id: $routeParams.id });
    };

  });
